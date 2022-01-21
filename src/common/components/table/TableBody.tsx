import { RefObject, useEffect, useRef } from "react";
import { DefaultProps } from "../../interfaces/DefaultProps";
import { PlaceHolderLoadingRow } from "./PlaceHolderLoadingRow";
import _ from "underscore";

interface TableBodyProps {
  containerRef: RefObject<HTMLElement | null>;
  loading: boolean;
  onActiveLastElement: (data: any) => void;
}

export const TableBody = (props: DefaultProps<TableBodyProps>) => {
  const trRef = useRef<HTMLTableRowElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  const listenerIntersection = (
    containerRef: HTMLElement,
    rowElementRef: HTMLTableRowElement
  ) => {
    /**
     * Validate if exists a observer created if is true remove observer existing
     */
    if (observerRef.current && observerRef.current.disconnect) {
      observerRef.current.disconnect();
    }

    const callback = function (intersections: IntersectionObserverEntry[]) {
      const totalRows =
        containerRef
          ?.querySelector(".table__body")
          ?.querySelectorAll(".table__tr")?.length || 0;

      const [element] = intersections;
      const { isIntersecting } = element;
      if (isIntersecting && totalRows > 15 && !props.loading) {
        props.onActiveLastElement({
          trRef: rowElementRef,
          containerRef: containerRef
        });
      }
    };

    const heightRow = 3;
    const total = heightRow * 14;

    const options: IntersectionObserverInit = {
      root: containerRef,
      rootMargin: `0px 0px ${total}px 0px`,
      threshold: 0.3
    };
    observerRef.current = new window.IntersectionObserver(callback, options);

    if (rowElementRef) {
      observerRef.current.observe(rowElementRef);
    }
  };

  useEffect(() => {
    if (trRef?.current && props?.containerRef.current) {
      listenerIntersection(props?.containerRef.current, trRef.current);
    }
  }, [props.containerRef, trRef]);

  return (
    <tbody className="table__body">
      {props.children}
      {props.loading && <PlaceHolderLoadingRow />}
      <tr className="tr-scroll-infinite" ref={trRef}></tr>
    </tbody>
  );
};
