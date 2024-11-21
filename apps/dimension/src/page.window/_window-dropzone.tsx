import { faDiagramNext } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";

import { Droppable } from "../component.dnd/_droppable";

import type { WindowDropzoneProps } from "./_window.interfaces";
import * as styles from "./_window.styles";

export function WindowDropzone(props: WindowDropzoneProps) {
  return (
    <>
      {props.item && (
        <div className={styles.window_dropzone_wrapper}>
          <div
            className={cx(
              styles.window_dropzone_overlay,
              "window_dropzone_overlay_selector",
            )}
          ></div>
          <Droppable id={props.item.id} data={{ position: "top" }}>
            <button
              className={cx(
                styles.window_top_dropzone_button,
                "window_droppable_button",
              )}
            >
              <FontAwesomeIcon icon={faDiagramNext} />
            </button>
          </Droppable>
          <Droppable id={props.item.id} data={{ position: "bottom" }}>
            <button
              className={cx(
                styles.window_bottom_dropzone_button,
                "window_droppable_button",
              )}
            >
              <FontAwesomeIcon icon={faDiagramNext} />
            </button>
          </Droppable>
          <Droppable id={props.item.id} data={{ position: "left" }}>
            <button
              className={cx(
                styles.window_left_dropzone_button,
                "window_droppable_button",
              )}
            >
              <FontAwesomeIcon icon={faDiagramNext} />
            </button>
          </Droppable>
          <Droppable id={props.item.id} data={{ position: "right" }}>
            <button
              className={cx(
                styles.window_right_dropzone_button,
                "window_droppable_button",
              )}
            >
              <FontAwesomeIcon icon={faDiagramNext} />
            </button>
          </Droppable>
          {props.children}
        </div>
      )}
    </>
  );
}
