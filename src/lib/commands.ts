export enum ActionType {
  AddTag = "add-tag",
  RemoveTag = "remove-tag",
  SignOut = "sign-out",
}

export interface Action {
  type: string;
  args: string[];
}

const tokenToAction: Record<string, ActionType> = {
  tag: ActionType.AddTag,
  untag: ActionType.RemoveTag,
  leave: ActionType.SignOut,
};

export const parseCommand = (commandString: string): Action | null => {
  const tokens = commandString.split(" ");

  const actionToken = tokens.shift();
  if (actionToken === undefined) {
    return null;
  }

  const type = actionToken ? tokenToAction[actionToken] : null;
  if (!type) {
    return null;
  }

  return { type, args: tokens };
};
