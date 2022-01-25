export const AccountType = {
  PET_SITTER: 'pet_sitter',
  PET_OWNER: 'pet_owner',
} as const;

export type AccountTypeKey = keyof typeof AccountType;
export type AccountTypeVal = typeof AccountType[AccountTypeKey];
