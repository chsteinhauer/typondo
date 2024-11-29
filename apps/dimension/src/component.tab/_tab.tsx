import { faFileLines, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";
import { useDispatch, useSelector } from "react-redux";

import { Draggable } from "../component.dnd/_draggable";
import {
  removeItemFromContentLayer,
  setFocus,
  setItemAsOpenInContentLayer,
  setSelected,
} from "../page.main/_layer-state";

import type { TabProps } from "./_tab.interfaces";
import * as styles from "./_tab.style";

export function Tab(props: TabProps) {
  // const closeTabClickedHandler = () => {
  //   props.closeTabClickedHandler(props.item);
  // };

  // const itemClickedHandler = () => {
  //   props.itemClickedHandler(props.item);
  // };

  const dispatch = useDispatch();

  const tabClickedHandler = () => {
    dispatch(setSelected(props.item));
    dispatch(setFocus(props.item));
    dispatch(setItemAsOpenInContentLayer(props.item));
  };

  const closeTabClickedHandler = () => {
    dispatch(removeItemFromContentLayer(props.item));
  };

  return (
    <div className={styles.tab}>
      <Draggable id={"tab-" + props.item.id}>
        <button
          className={cx(
            styles.tab_card,
            props.open ? styles.tab_open : "",
            props.focus ? styles.tab_focus : "",
          )}
          onMouseDown={tabClickedHandler}
        >
          <FontAwesomeIcon className={styles.tab_icon} icon={faFileLines} />
          <span className={styles.tab_text}>{props.item.item.title}</span>
        </button>

        <button className={styles.tab_button} onClick={closeTabClickedHandler}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </Draggable>
    </div>
  );
}
