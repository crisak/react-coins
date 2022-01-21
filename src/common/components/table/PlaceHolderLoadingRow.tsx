import { PlaceHolderLoading } from "../placeHolderLoading/PlaceHolderLoading";

const rows = new Array(17).fill(Date.now());

export const PlaceHolderLoadingRow = () => {
  return (
    <>
      {rows.map((_, index) => (
        <tr key={`key-loading-${index}`}>
          <td colSpan={5} className="table__td">
            <PlaceHolderLoading className="place-holder-loading--linear-10" />
          </td>
        </tr>
      ))}
    </>
  );
};
