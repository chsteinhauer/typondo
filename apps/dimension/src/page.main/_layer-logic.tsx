import { v4 as uuidv4 } from "uuid";

import type {
  ContentLayer,
  Item,
  Layer,
  LayoutLayer,
} from "./_main.interfaces";

export enum Position {
  TOP,
  BOTTOM,
  LEFT,
  RIGHT,
}

export type Direction = "row" | "column";

export type PositionText = "top" | "bottom" | "left" | "right";

const generateUUID = () => {
  return uuidv4();
};

const createNewContentLayer = (
  item: Item,
  parent: LayoutLayer,
): ContentLayer => {
  return {
    id: generateUUID(),
    items: [item],
    open: item,
    sort: 0,
    parentId: parent.id,
  };
};

const getId = (id: string, position: Position): string => {
  const posText = getPositionText(position);

  return id.replace(posText + "-", "");
};

export const getPositionEnum = (
  position: "top" | "bottom" | "left" | "right",
): Position => {
  switch (position) {
    case "top":
      return Position.TOP;
    case "bottom":
      return Position.BOTTOM;
    case "left":
      return Position.LEFT;
    case "right":
      return Position.RIGHT;

    default:
      return Position.LEFT;
  }
};

const getPositionText = (position: Position): PositionText => {
  switch (position) {
    case Position.TOP:
      return "top";
    case Position.BOTTOM:
      return "bottom";
    case Position.LEFT:
      return "left";
    case Position.RIGHT:
      return "right";

    default:
      return "left";
  }
};

const pushChild = (position: Position): boolean => {
  switch (position) {
    case Position.TOP:
    case Position.LEFT:
      return false;

    case Position.BOTTOM:
    case Position.RIGHT:
      return true;

    default:
      return true;
  }
};

const getDirection = (position: Position): Direction => {
  switch (position) {
    case Position.TOP:
    case Position.BOTTOM:
      return "column";

    case Position.LEFT:
    case Position.RIGHT:
      return "row";

    default:
      return "row";
  }
};

const layerCleanUp = (root: LayoutLayer) => {};

export const isContentLayer = (layer: Layer) => {
  return "id" in layer && "items" in layer && "open" in layer;
};

export const isLayoutLayer = (layer: Layer) => {
  return "id" in layer && "direction" in layer && "children" in layer;
};

export const findItemLayer = (
  root: LayoutLayer,
  itemId: string,
): ContentLayer => {
  const traverseLayers = (children?: Layer[]): Layer | undefined => {
    return children?.find((c) => {
      return isContentLayer(c)
        ? c.items.find((i) => i.id === itemId)
        : traverseLayers((c as LayoutLayer).children);
    });
  };

  return traverseLayers(root.children) as ContentLayer;
};

export const findLayer = (root: LayoutLayer, id: string) => {
  const traverseLayers = (children?: Layer[]): Layer | undefined => {
    return children?.find((c) =>
      c.id === id ? c : traverseLayers((c as LayoutLayer).children),
    );
  };

  if (id === root.id) return root;

  return traverseLayers(root.children);
};

export const addItemToContentLayerLogic = (
  root: LayoutLayer,
  itemSiblingId: string,
  item: Item,
): LayoutLayer => {
  const layer = findItemLayer(root, itemSiblingId);

  const index = layer.items.findIndex((i) => i.id === itemSiblingId);

  layer.items.splice(index + 1, 0, item);

  layer.open = item;

  return root;
};

export const removeItemFromContentLayerLogic = (
  root: LayoutLayer,
  item: Item,
  focus?: Item,
) => {
  const layer = findItemLayer(root, item.id);
  const index = layer.items.findIndex((i) => i.id === item.id);
  layer.items.splice(index, 1);

  let newFocusItem: Item | undefined = focus;

  if (layer.items.length === 0) {
    const parent = findLayer(root, layer.parentId) as LayoutLayer;
    const cindex = layer.items.findIndex((i) => i.id === item.id);
    parent.children.splice(cindex, 1);

    if (parent.id === root.id && parent.children.length === 0) {
      newFocusItem = undefined;
    }
  } else {
    if (layer.open.id === item.id) {
      const newIndex = index < 1 ? index : index - 1;
      layer.open = layer.items[newIndex] as Item;

      if (focus?.id === item.id) {
        newFocusItem = layer.items[newIndex];
      }
    }
  }

  return newFocusItem;
};

export const setItemAsOpenInContentLayerLogic = (
  root: LayoutLayer,
  item: Item,
) => {
  const layer = findItemLayer(root, item.id);

  layer.open = item;

  return root;
};

export const addContentLayerLogic = (
  root: LayoutLayer,
  parentId: string,
  item: Item,
  position: Position,
): LayoutLayer => {
  const addNewContentLayer = (i: Item, p: LayoutLayer) => {
    const newContentLayer = createNewContentLayer(i, p);

    if (pushChild(position)) {
      p.children.push(newContentLayer);
    } else {
      p.children.unshift(newContentLayer);
    }

    //p.children.sort((a, b) => a.sort - b.sort);
  };

  const layerId = getId(parentId, position);
  let parent = findLayer(root, layerId);

  if (!parent) {
    parent = findItemLayer(root, layerId);

    if (!parent) throw new Error("could not find parent nor root layer");
  }

  if (isContentLayer(parent)) {
    const grandparent = findLayer(root, parent.parentId) as LayoutLayer;

    console.log(parent.parentId, grandparent?.id);

    let newParent = undefined;

    if (getDirection(position) === grandparent.direction) {
      newParent = grandparent;
    } else {
      newParent = {
        id: generateUUID(),
        direction: getDirection(position),
        children: [parent],
        sort: parent.sort,
        parentId: grandparent.id,
      };

      const index = grandparent.children.findIndex((c) => c.id === parent.id);

      if (index > -1) {
        grandparent.children[index] = newParent;
      }
    }

    addNewContentLayer(item, newParent);
  } else if (isLayoutLayer(parent)) {
    addNewContentLayer(item, parent);
  }

  return root;
};
