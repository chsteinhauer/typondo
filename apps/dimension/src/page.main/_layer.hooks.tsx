import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import type {
  ContentLayer,
  Item,
  Layer,
  LayoutLayer,
} from "./_main.interfaces";

export const useLayers = () => {
  const [rootLayer, setRootLayer] = useState<LayoutLayer>();

  useEffect(
    () =>
      setRootLayer({
        id: "root",
        direction: "row",
        children: [],
        sort: 0,
      }),
    [],
  );

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

  const isContentLayer = (layer: Layer) => {
    return "id" in layer && "items" in layer && "open" in layer;
  };

  const isLayoutLayer = (layer: Layer) => {
    return "id" in layer && "direction" in layer && "children" in layer;
  };

  const findItemTab = (item: Item): ContentLayer => {
    const traverseLayers = (children?: Layer[]): Layer | undefined => {
      return children?.find((c) => {
        return isContentLayer(c)
          ? c.items.find((i) => i.id === item.id)
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

  const addContentLayer = (parentId: string, item: Item) => {
    const addNewContentLayer = (i: Item, p: LayoutLayer) => {
      const newContentLayer = createNewContentLayer(i, p);
      p.children.push(newContentLayer);
      p.children.sort((a, b) => a.sort - b.sort);
    };

    const parent = findLayer(parentId);

    if (!parent) throw new Error("could not find layer");

    if (isContentLayer(parent)) {
      const grandparent = parent.parent;

      const newParent: LayoutLayer = {
        id: generateUUID(),
        direction: "row",
        children: [parent],
        sort: parent.sort,
        parent: grandparent,
      };

      const index = grandparent.children.findIndex((c) => c.id === parentId);

      if (index > -1) {
        grandparent.children[index] = newParent;
      }

      addNewContentLayer(item, newParent);
    } else if (isLayoutLayer(parent)) {
      addNewContentLayer(item, parent);
    }
  };

  return {
    rootLayer,
    findLayer,
    findItemTab,
    addContentLayer,
    isContentLayer,
    isLayoutLayer,
  };
};
