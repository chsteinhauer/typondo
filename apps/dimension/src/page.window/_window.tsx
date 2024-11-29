import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Tab } from "../component.tab/_tab";
import TabWrapper from "../component.tab/_tab.wrapper";
import { EditorView } from "../page.editor/_editor";
import { setFocus, setSelected } from "../page.main/_layer-state";
import type { RootState } from "../store";

import { WindowDropzone } from "./_window-dropzone";
import type { WindowProps } from "./_window.interfaces";
import * as styles from "./_window.styles";

export function Window(props: WindowProps) {
  // const [openTabItem, setOpenTabItem] = useState<Item>();
  // const [focusTabItem, setFocusTabItem] = useState<Item>();
  const dispatch = useDispatch();
  const focus = useSelector((state: RootState) => state.layer.focus);

  const windowRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const windowClickedHandler = () => {
      dispatch(setSelected(props.layer.open));
      dispatch(setFocus(props.layer.open));
    };

    windowRef.current?.addEventListener("click", windowClickedHandler);

    return () => {
      windowRef.current?.removeEventListener("click ", windowClickedHandler);
    };
  }, [dispatch, props.layer.open]);
  // useEffect(() => {
  // if (props.layer.items.find((i) => i.id === props.states.selectedItem?.id))
  // { setOpenTabItem(props.states.selectedItem); } else if
  // (!props.layer.items.find((i) => i.id === openTabItem?.id)) { if
  // (props.layer.items.length)
  // setOpenTabItem(props.layer.items[props.layer.items.length - 1]); } },
  // [openTabItem?.id, props.states.selectedItem, props.layer.items]);

  // useEffect(() => {
  //   if (props.layer.items.find((i) => i.id === props.states.focusItem?.id)) {
  //     setFocusTabItem(props.states.focusItem);
  //   }
  // }, [props.states.focusItem, props.layer.items]);

  return (
    <div className={styles.window_wrapper}>
      {props.layer.items.length > 0 && (
        <WindowDropzone item={props.layer.open}>
          <div className={styles.window_tab_wrapper}>
            <TabWrapper>
              {props.layer.items.map((item) => (
                <Tab
                  key={item.id}
                  item={item}
                  open={item.id === props.layer.open.id}
                  focus={item.id === focus?.id}
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
          <div className={styles.window} ref={windowRef}>
            {props.layer.open && (
              <EditorView key={props.layer.open.id} item={props.layer.open} />
            )}
          </div>
        </WindowDropzone>
      )}
    </div>
  );
}
