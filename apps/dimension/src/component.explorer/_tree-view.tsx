import {
  faChevronDown,
  faChevronUp,
  faFileLines,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cx } from "@linaria/core";
import type { Folder, File } from "@prisma/client";
import type { ReactNode } from "react";
import React, { useEffect, useState } from "react";

import * as styles from "./_explorer.styles";

export enum TreeNodeType {
  FOLDER,
  FILE,
}

export type TreeNode = {
  id: string;
  name: string;
  item: File | Folder;
  type: TreeNodeType;
  children?: TreeNode[];
};

type TreeViewProps = {
  data: TreeNode[] | undefined;
  fileClickedHandler: (file: File) => void;
  selectedId?: string;
};

type TreeNodeProps = {
  node: TreeNode;
  fileClickedHandler: (file: File) => void;
  selectedId?: string;
};

const TreeNode = (props: TreeNodeProps) => {
  const [selectedId, setSelectedId] = useState<string | undefined>(
    props.selectedId,
  );
  const [isOpen, setIsOpen] = useState(false);
  const toggleNode = () => setIsOpen(!isOpen);

  useEffect(() => setSelectedId(props.selectedId), [props.selectedId]);

  const renderIcon = (node: TreeNode): ReactNode => {
    switch (node.type) {
      case TreeNodeType.FOLDER:
        return <FontAwesomeIcon icon={faFolder} />;
      case TreeNodeType.FILE:
        return <FontAwesomeIcon icon={faFileLines} />;
      default:
        break;
    }
  };

  const fileClickedHandler = () => {
    props.fileClickedHandler(props.node.item as File);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <li
      className={cx(
        styles.explorer_tree_node,
        props.node.id === props.selectedId ? "selected" : "",
      )}
      onClick={fileClickedHandler}
    >
      {props.node.children && (
        <button onClick={toggleNode} className={styles.explorer_toggle_icon}>
          {isOpen ? (
            <FontAwesomeIcon icon={faChevronDown} />
          ) : (
            <FontAwesomeIcon icon={faChevronUp} />
          )}
        </button>
      )}
      {renderIcon(props.node)}
      <span className={styles.explorer_title}>{props.node.name}</span>
      {isOpen && (
        <TreeView
          data={props.node?.children}
          selectedId={selectedId}
          fileClickedHandler={props.fileClickedHandler}
        />
      )}
    </li>
  );
};

const TreeView = (props: TreeViewProps) => {
  return (
    <ul className={styles.explorer_tree_view}>
      {props.data?.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          selectedId={props.selectedId}
          fileClickedHandler={props.fileClickedHandler}
        />
      ))}
    </ul>
  );
};

export default TreeView;
