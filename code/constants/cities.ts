type City = {
  value: string;
  label: string;
};

const cities: Record<string, City[]> = {
  mh: [
    {
      value: "pu",
      label: "Pune",
    },
    {
      value: "mu",
      label: "Mumbai",
    },
  ],
  rj: [
    {
      value: "ja",
      label: "Jaipur",
    },
    {
      value: "ud",
      label: "Udaipur",
    },
  ],
  az: [
    {
      value: "ph",
      label: "Pheonix",
    },
    {
      value: "tu",
      label: "Tuscon",
    },
  ],
};

export const getCitiesByState = (state: string) => cities[state] ?? [];
