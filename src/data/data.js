module.exports = {
  optionsContract: [
    { label: "Tout risque", description: "Assurance tout risque" },
    { label: "Vol", description: "Assurance sur vol uniquement" },
    { label: "Incendie", description: "Assurance sur incendie couvert" },
    {
      label: "Décès",
      description: "Assurance décès pour un membre de la famille",
    },
    { label: "Inondation", description: "Assurance inondation couvert" },
  ],
  users: [
    { email: "admin1@test.fr", password: "12345", role: "admin" },
    { email: "admin2@test.fr", password: "12345", role: "admin" },
    { email: "paul@test.fr", password: "12345", role: "client" },
    { email: "gabo@test.fr", password: "12345", role: "client" },
  ],
};
