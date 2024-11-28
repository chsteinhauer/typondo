import { useEffect, useState } from "react";
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

export const useLayers = () => {
  const [rootLayer, setRootLayer] = useState<LayoutLayer>({
    id: "root",
    direction: "row",
    children: [],
    sort: 0,
  });

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
      parent,
    };
  };

  const getId = (id: string, position: Position): string => {
    const posText = getPositionText(position);

    return id.replace(posText + "-", "");
  };

  const getPositionEnum = (
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

  const isContentLayer = (layer: Layer) => {
    return "id" in layer && "items" in layer && "open" in layer;
  };

  const isLayoutLayer = (layer: Layer) => {
    return "id" in layer && "direction" in layer && "children" in layer;
  };

  const findItemTab = (itemId: string): ContentLayer => {
    const traverseLayers = (children?: Layer[]): Layer | undefined => {
      return children?.find((c) => {
        return isContentLayer(c)
          ? c.items.find((i) => i.id === itemId)
          : traverseLayers((c as LayoutLayer).children);
      });
    };

    return traverseLayers(rootLayer?.children) as ContentLayer;
  };

  const findLayer = (id: string) => {
    const traverseLayers = (children?: Layer[]): Layer | undefined => {
      return children?.find((c) =>
        c.id === id ? c : traverseLayers((c as LayoutLayer).children),
      );
    };

    if (id === rootLayer?.id) return rootLayer;

    return traverseLayers(rootLayer?.children);
  };

  const addContentLayer = (
    parentId: string,
    item: Item,
    position: Position,
  ) => {
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
    let parent = findLayer(layerId);

    if (!parent) {
      parent = findItemTab(layerId);

      if (!parent) throw new Error("could not find parent nor root layer");
    }

    if (isContentLayer(parent)) {
      const grandparent = parent.parent;

      let newParent = undefined;

      if (getDirection(position) === grandparent.direction) {
        newParent = grandparent;
      } else if (grandparent.id !== rootLayer.id) {
        newParent = {
          id: generateUUID(),
          direction: getDirection(position),
          children: [parent],
          sort: parent.sort,
          parent: grandparent,
        };

        const index = grandparent.children.findIndex((c) => c.id === parentId);

        if (index > -1) {
          grandparent.children[index] = newParent;
        }
      } else {
        rootLayer.direction = getDirection(position);
        newParent = rootLayer;
      }

      console.log(newParent);

      addNewContentLayer(item, newParent);
    } else if (isLayoutLayer(parent)) {
      addNewContentLayer(item, parent);
    }

    //console.log(rootLayer);
  };

  return {
    rootLayer,
    findLayer,
    findItemTab,
    addContentLayer,
    isContentLayer,
    isLayoutLayer,
    getPositionEnum,
  };
};
