export const locationOptions = [
  { value: 'montreal', label: { en: 'Canada', fr: 'Canada' } },
  { value: 'dubai', label: { en: 'UAE', fr: 'Émirats Arabes Unis' } },
  { value: 'turkey', label: { en: 'Turkey', fr: 'Turquie' } }
];

export const getLocationLabel = (value: string, locale: 'en' | 'fr' = 'en'): string => {
  const location = locationOptions.find(option => option.value === value);
  return location ? location.label[locale] : value;
};

export const getLocationValue = (label: string): string => {
  const location = locationOptions.find(option => 
    option.label.en === label || option.label.fr === label
  );
  return location ? location.value : label;
}; 