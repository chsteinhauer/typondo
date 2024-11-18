import { useLayers } from "../page.main/_layer.hooks";

import { Window } from "./_window";
import type { WindowWrapperProps } from "./_window.interfaces";
//import * as styles from "./_window.styles";

export function WindowWrapper(props: WindowWrapperProps) {
  const { isContentLayer, isLayoutLayer } = useLayers();

  const style = { display: "flex", flexDirection: props.layer.direction };

  return (
    <div style={style}>
      {props.layer.children.map((l) => {
        if (isContentLayer(l)) {
          return <Window key={l.id} layer={l} handlers={props.handlers} />;
        } else if (isLayoutLayer(l)) {
          return (
            <WindowWrapper key={l.id} layer={l} handlers={props.handlers} />
          );
        }
      })}
    </div>
  );
}
