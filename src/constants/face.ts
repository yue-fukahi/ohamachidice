const Face = {
  O: "o",
  Ha: "ha",
  Ma: "ma",
  Chi: "chi",
  Ko: "ko",
  Empty: "empty",
} as const;
type Face = typeof Face[keyof typeof Face];

export {
  Face,
}
