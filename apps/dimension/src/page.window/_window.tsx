import { Tab } from "../component.tab/_tab";
import TabWrapper from "../component.tab/_tab.wrapper";
import { EditorView } from "../page.editor/_editor";

import type { WindowProps } from "./_window.interfaces";
import * as styles from "./_window.styles";

export function Window(props: WindowProps) {
  return (
    <div className={styles.window_wrapper}>
      {props.layer.items.length > 0 && (
        <>
          <div className={styles.window_tab_wrapper}>
            <TabWrapper>
              {props.layer.items.map((item) => (
                <Tab
                  key={item.id}
                  item={item}
                  open={item.id === props.layer.open.id}
                  closeTabClickedHandler={() =>
                    props.handlers.closeTabClickedHandler(props.layer, item)
                  }
                  itemClickedHandler={() =>
                    props.handlers.tabClickedHandler(props.layer, item)
                  }
                />
              ))}
            </TabWrapper>
          </div>
          <div className={styles.window}>
            {props.layer.open && (
              <EditorView key={props.layer.open.id} item={props.layer.open} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
