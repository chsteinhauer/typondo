import { isContentLayer, isLayoutLayer } from "../page.main/_layer-logic";

import { Window } from "./_window";
import type { WindowWrapperProps } from "./_window.interfaces";
//import * as styles from "./_window.styles";

export function WindowWrapper(props: WindowWrapperProps) {
  const style = {
    display: "flex",
    flexDirection: props.layer.direction,
    width: "100%",
  };

  return (
    <div style={style}>
      {props.layer.children.map((l) => {
        if (isContentLayer(l)) {
          return (
            <Window
              key={l.id}
              layer={l}
              handlers={props.handlers}
              states={props.states}
            />
          );
        } else if (isLayoutLayer(l)) {
          return (
            <WindowWrapper
              key={l.id}
              layer={l}
              handlers={props.handlers}
              states={props.states}
            />
          );
        }
      })}
    </div>
  );
}
