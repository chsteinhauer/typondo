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
              "window_dropzone_overlay_selector" + props.item,
            )}
          ></div>
          <button
            className={cx(
              styles.window_top_dropzone_button,
              "window_droppable_button",
            )}
          >
            <div className="container">
              <Droppable
                key={"top-" + props.item.id}
                id={"top-" + props.item.id}
                data={{ position: "top" }}
              >
                <FontAwesomeIcon icon={faDiagramNext} />
              </Droppable>
            </div>
          </button>
          <button
            className={cx(
              styles.window_bottom_dropzone_button,
              "window_droppable_button",
            )}
          >
            <div className="container">
              <Droppable
                key={"bottom-" + props.item.id}
                id={"bottom-" + props.item.id}
                data={{ position: "bottom" }}
              >
                <FontAwesomeIcon icon={faDiagramNext} />
              </Droppable>
            </div>
          </button>
          <button
            className={cx(
              styles.window_left_dropzone_button,
              "window_droppable_button",
            )}
          >
            <div className="container">
              <Droppable
                key={"left-" + props.item.id}
                id={"left-" + props.item.id}
                data={{ position: "left" }}
              >
                <FontAwesomeIcon icon={faDiagramNext} />
              </Droppable>
            </div>
          </button>

          <button
            className={cx(
              styles.window_right_dropzone_button,
              "window_droppable_button",
            )}
          >
            <div className="container">
              <Droppable
                key={"right-" + props.item.id}
                id={"right-" + props.item.id}
                data={{ position: "right" }}
              >
                <FontAwesomeIcon icon={faDiagramNext} />
              </Droppable>
            </div>
          </button>

          {props.children}
        </div>
      )}
    </>
  );
}
