import { useEffect, useState } from "react";

import { Tab } from "../component.tab/_tab";
import TabWrapper from "../component.tab/_tab.wrapper";
import { EditorView } from "../page.editor/_editor";
import type { Item } from "../page.main/_main.interfaces";

import type { WindowProps } from "./_window.interfaces";
import * as styles from "./_window.styles";

export function Window(props: WindowProps) {
  const [openTabItem, setOpenTabItem] = useState<Item>();

  useEffect(() => {
    if (props.layer.items.find((i) => i.id === props.states.selectedItem?.id)) {
      setOpenTabItem(props.states.selectedItem);
    } else if (!props.layer.items.find((i) => i.id === openTabItem?.id)) {
      if (props.layer.items.length)
        setOpenTabItem(props.layer.items[props.layer.items.length - 1]);
    }
  }, [openTabItem?.id, props.layer.items, props.states.selectedItem]);

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
                  open={item.id === openTabItem?.id}
                  closeTabClickedHandler={() =>
                    props.handlers.closeTabClickedHandler(props.layer, item)
                  }
                  itemClickedHandler={() =>
                    props.handlers.tabClickedHandler(item)
                  }
                />
              ))}
            </TabWrapper>
          </div>
          <div className={styles.window}>
            {openTabItem && (
              <EditorView key={openTabItem.id} item={openTabItem} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
