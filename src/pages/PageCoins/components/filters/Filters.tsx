import "./styles.scss";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Box, Button } from "../../../../common/components";
import { Input } from "../../../../common/components/input/Input";
import { Select } from "../../../../common/components/select/Selects";
import { useDispatch, useSelector } from "react-redux";
import { saveCoinsFiltered, saveFilter } from "../../../../state/crypto";
import { capListOptions, filterCoins, priceOptions } from "./service";
import { debounce } from "../../../../common/utils";
import { AiOutlineClear } from "react-icons/ai";
import _ from "underscore";
import { StoreFilters, StoreCoinData } from "../../../../state/crypto";

export const Filters = () => {
  const dispatch = useDispatch();

  const filters: StoreFilters = useSelector(
    (store: any) => store.filters as StoreFilters
  );
  const coins: StoreCoinData[] = useSelector(
    (store: any) => store.coins as StoreCoinData[],
    _.isEqual
  );

  const [valueSearch, setValueSearch] = useState(() => {
    return filters?.search || "";
  });

  const filterAndUpdateCoins = (filtersUpdate: any) => {
    const { filters: flt, coinsFiltered } = filterCoins(
      { ...filtersUpdate },
      coins as any
    );
    const filterDataAction = saveFilter(flt);
    const coinsFilteredAction = saveCoinsFiltered(coinsFiltered);

    dispatch(filterDataAction);
    dispatch(coinsFilteredAction);
  };

  const handlerOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;

    const filtersUpdate = {
      ...filters,
      [name]: value
    };

    filterAndUpdateCoins(filtersUpdate);
  };

  const debounceFilterCoins = useMemo(() => {
    return debounce(filterAndUpdateCoins, 1000);
  }, [coins]);

  const handleOnChangeSearch = (refElement: ChangeEvent<HTMLInputElement>) => {
    const { value } = refElement.target;

    const filtersUpdate = {
      ...filters,
      search: value
    };

    setValueSearch(value);
    debounceFilterCoins(filtersUpdate);
  };

  const clearFilters = () => {
    const filterData = saveFilter({
      hasFilters: false,
      price: "",
      search: "",
      cap: ""
    });

    dispatch(filterData);
    dispatch(saveCoinsFiltered([]));
    setValueSearch("");
  };

  useEffect(() => {
    if (filters.hasFilters) {
      filterAndUpdateCoins({ ...filters });
    }
  }, [coins]);

  return (
    <Box className="mb7 filters-coins">
      <div className="container-buttons">
        <div className="container-selects">
          <Select
            aria-label="Filter by cap"
            name="cap"
            className="mr5"
            value={filters.cap}
            items={capListOptions}
            onChange={handlerOnChange}
          />
          <Select
            aria-label="Filter by price"
            name="price"
            className="mr5"
            value={filters.price}
            items={priceOptions}
            onChange={handlerOnChange}
          />
        </div>
        {filters.hasFilters && (
          <Button
            role="button"
            icon={<AiOutlineClear />}
            onClick={clearFilters}
            type="text"
          >
            Borrar filtros
          </Button>
        )}
      </div>
      <div className="container-input">
        <Input
          label="Buscar"
          name="search"
          aria-label="Search coins"
          value={valueSearch}
          onChange={handleOnChangeSearch}
        />
      </div>
    </Box>
  );
};
