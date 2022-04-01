const HandName = {
  Ohamachiko: "OHAMACHIKO",
  Hakomachiko: "HAKOMACHIKO",
  Machiko: "MACHIKO",
  MaoMao: "MAOMAO",
  Hamachi: "HAMACHI",
} as const;
type HandName = typeof HandName[keyof typeof HandName];

export {
  HandName,
}
