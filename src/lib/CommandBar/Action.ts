export enum ActionType {
  NewNote = "new-note",
  AddTag = "add-tag",
  RemoveTag = "remove-tag",
  SignOut = "sign-out",
}

export interface Action {
  type: ActionType;
  args: string[];
}

const tokenToAction: Record<string, ActionType> = {
  new: ActionType.NewNote,
  tag: ActionType.AddTag,
  untag: ActionType.RemoveTag,
  signout: ActionType.SignOut,
};

export namespace Action {
  export const fromString = (str: string): Action | null => {
    const tokens = str.trim().split(" ");

    const actionToken = tokens.shift();
    if (actionToken === undefined) {
      return null;
    }

    const type = tokenToAction[actionToken] || null;
    if (!type) {
      return null;
    }

    return { type, args: tokens };
  };
}
