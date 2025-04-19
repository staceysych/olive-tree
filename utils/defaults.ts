export const LANGUAGES = [
    {
      code: "en",
      name: "English",
      nativeName: "English",
      flag: "🇬🇧",
    },
    {
      code: "ru",
      name: "Russian",
      nativeName: "Русский",
      flag: "🇷🇺",
    },
    {
      code: "el",
      name: "Greek",
      nativeName: "Ελληνικά",
      flag: "🇬🇷",
    },
  ]
  
  export const STORAGE_KEY = 'olive-tree-language'

export type Location = {
  id: string;
  name: {
    en: string;
    el: string;
    ru: string;
  };
  description: {
    en: string;
    el: string;
    ru: string;
  };
  slug: string;
  parentLocation?: string;
};

export const locations: Location[] = [
  {
    id: 'paphos',
    name: {
      en: 'Paphos',
      el: 'Πάφος',
      ru: 'Пафос'
    },
    description: {
      en: 'Fresh farm goods delivery in Paphos, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στην Πάφο, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Пафосе, Кипр'
    },
    slug: 'paphos'
  },
  {
    id: 'kato-paphos',
    name: {
      en: 'Kato Paphos',
      el: 'Κάτω Πάφος',
      ru: 'Като Пафос'
    },
    description: {
      en: 'Fresh farm goods delivery in Kato Paphos, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στην Κάτω Πάφο, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Като Пафосе, Кипр'
    },
    slug: 'kato-paphos',
    parentLocation: 'paphos'
  },
  {
    id: 'coral-bay',
    name: {
      en: 'Coral Bay',
      el: 'Κοράλ Μπέι',
      ru: 'Корал Бэй'
    },
    description: {
      en: 'Fresh farm goods delivery in Coral Bay, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στο Κοράλ Μπέι, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Корал Бэй, Кипр'
    },
    slug: 'coral-bay',
    parentLocation: 'paphos'
  },
  {
    id: 'peyia',
    name: {
      en: 'Peyia',
      el: 'Πέγεια',
      ru: 'Пейя'
    },
    description: {
      en: 'Fresh farm goods delivery in Peyia, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στην Πέγεια, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Пейе, Кипр'
    },
    slug: 'peyia',
    parentLocation: 'paphos'
  },
  {
    id: 'kathikas',
    name: {
      en: 'Kathikas',
      el: 'Καθικάς',
      ru: 'Катикас'
    },
    description: {
      en: 'Fresh farm goods delivery in Kathikas, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στον Καθικά, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Катикасе, Кипр'
    },
    slug: 'kathikas',
    parentLocation: 'paphos'
  },
  {
    id: 'drouseia',
    name: {
      en: 'Drouseia',
      el: 'Δρουσειά',
      ru: 'Друсея'
    },
    description: {
      en: 'Fresh farm goods delivery in Drouseia, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στη Δρουσειά, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Друсее, Кипр'
    },
    slug: 'drouseia',
    parentLocation: 'paphos'
  },
  {
    id: 'polemi',
    name: {
      en: 'Polemi',
      el: 'Πολέμι',
      ru: 'Полеми'
    },
    description: {
      en: 'Fresh farm goods delivery in Polemi, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στο Πολέμι, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Полеми, Кипр'
    },
    slug: 'polemi',
    parentLocation: 'paphos'
  },
  {
    id: 'stroumpi',
    name: {
      en: 'Stroumpi',
      el: 'Στρούνμπι',
      ru: 'Струмпи'
    },
    description: {
      en: 'Fresh farm goods delivery in Stroumpi, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στο Στρούνμπι, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Струмпи, Кипр'
    },
    slug: 'stroumpi',
    parentLocation: 'paphos'
  },
  {
    id: 'panagia',
    name: {
      en: 'Panagia',
      el: 'Παναγιά',
      ru: 'Панагия'
    },
    description: {
      en: 'Fresh farm goods delivery in Panagia, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στην Παναγιά, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Панагии, Кипр'
    },
    slug: 'panagia',
    parentLocation: 'paphos'
  },
  {
    id: 'latsi',
    name: {
      en: 'Latsi',
      el: 'Λατσί',
      ru: 'Лаци'
    },
    description: {
      en: 'Fresh farm goods delivery in Latsi, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στο Λατσί, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Лаци, Кипр'
    },
    slug: 'latsi',
    parentLocation: 'paphos'
  },
  {
    id: 'polis-chrysochous',
    name: {
      en: 'Polis Chrysochous',
      el: 'Πόλη Χρυσοχούς',
      ru: 'Полис Хрисохус'
    },
    description: {
      en: 'Fresh farm goods delivery in Polis Chrysochous, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στην Πόλη Χρυσοχούς, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Полисе Хрисохусе, Кипр'
    },
    slug: 'polis-chrysochous',
    parentLocation: 'paphos'
  },
  {
    id: 'neo-chorio',
    name: {
      en: 'Neo Chorio',
      el: 'Νέο Χωριό',
      ru: 'Нео Хорио'
    },
    description: {
      en: 'Fresh farm goods delivery in Neo Chorio, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στο Νέο Χωριό, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Нео Хорио, Кипр'
    },
    slug: 'neo-chorio',
    parentLocation: 'paphos'
  },
  {
    id: 'tala',
    name: {
      en: 'Tala',
      el: 'Τάλα',
      ru: 'Тала'
    },
    description: {
      en: 'Fresh farm goods delivery in Tala, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στην Τάλα, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Тале, Кипр'
    },
    slug: 'tala',
    parentLocation: 'paphos'
  },
  {
    id: 'kissonerga',
    name: {
      en: 'Kissonerga',
      el: 'Κισσόνεργα',
      ru: 'Киссонерга'
    },
    description: {
      en: 'Fresh farm goods delivery in Kissonerga, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στην Κισσόνεργα, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Киссонерге, Кипр'
    },
    slug: 'kissonerga',
    parentLocation: 'paphos'
  },
  {
    id: 'emba',
    name: {
      en: 'Emba',
      el: 'Έμπα',
      ru: 'Эмба'
    },
    description: {
      en: 'Fresh farm goods delivery in Emba, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στην Έμπα, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Эмбе, Кипр'
    },
    slug: 'emba',
    parentLocation: 'paphos'
  },
  {
    id: 'geroskipou',
    name: {
      en: 'Geroskipou',
      el: 'Γεροσκήπου',
      ru: 'Героскипу'
    },
    description: {
      en: 'Fresh farm goods delivery in Geroskipou, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στη Γεροσκήπου, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Героскипу, Кипр'
    },
    slug: 'geroskipou',
    parentLocation: 'paphos'
  },
  {
    id: 'limassol',
    name: {
      en: 'Limassol',
      el: 'Λεμεσός',
      ru: 'Лимассол'
    },
    description: {
      en: 'Fresh farm goods delivery in Limassol, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στη Λεμεσό, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Лимассоле, Кипр'
    },
    slug: 'limassol'
  },
  {
    id: 'agios-athanasios',
    name: {
      en: 'Agios Athanasios',
      el: 'Άγιος Αθανάσιος',
      ru: 'Айос Афанасиос'
    },
    description: {
      en: 'Fresh farm goods delivery in Agios Athanasios, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στον Άγιο Αθανάσιο, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Айосе Афанасиосе, Кипр'
    },
    slug: 'agios-athanasios',
    parentLocation: 'limassol'
  },
  {
    id: 'mesa-geitonia',
    name: {
      en: 'Mesa Geitonia',
      el: 'Μέσα Γειτονιά',
      ru: 'Меса Йитонья'
    },
    description: {
      en: 'Fresh farm goods delivery in Mesa Geitonia, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στη Μέσα Γειτονιά, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Меса Йитонье, Кипр'
    },
    slug: 'mesa-geitonia',
    parentLocation: 'limassol'
  },
  {
    id: 'ypsonas',
    name: {
      en: 'Ypsonas',
      el: 'Ύψωνας',
      ru: 'Ипсонас'
    },
    description: {
      en: 'Fresh farm goods delivery in Ypsonas, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στον Ύψωνα, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Ипсонасе, Кипр'
    },
    slug: 'ypsonas',
    parentLocation: 'limassol'
  },
  {
    id: 'kato-polemidia',
    name: {
      en: 'Kato Polemidia',
      el: 'Κάτω Πολεμίδια',
      ru: 'Като Полемидья'
    },
    description: {
      en: 'Fresh farm goods delivery in Kato Polemidia, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στα Κάτω Πολεμίδια, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Като Полемидье, Кипр'
    },
    slug: 'kato-polemidia',
    parentLocation: 'limassol'
  },
  {
    id: 'germasogeia',
    name: {
      en: 'Germasogeia',
      el: 'Γερμασόγεια',
      ru: 'Гермасойя'
    },
    description: {
      en: 'Fresh farm goods delivery in Germasogeia, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στη Γερμασόγεια, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Гермасойе, Кипр'
    },
    slug: 'germasogeia',
    parentLocation: 'limassol'
  },
  {
    id: 'erimi',
    name: {
      en: 'Erimi',
      el: 'Ερήμη',
      ru: 'Эрими'
    },
    description: {
      en: 'Fresh farm goods delivery in Erimi, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στην Ερήμη, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Эрими, Кипр'
    },
    slug: 'erimi',
    parentLocation: 'limassol'
  },
  {
    id: 'kolossi',
    name: {
      en: 'Kolossi',
      el: 'Κολόσσι',
      ru: 'Колосси'
    },
    description: {
      en: 'Fresh farm goods delivery in Kolossi, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στο Κολόσσι, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Колосси, Кипр'
    },
    slug: 'kolossi',
    parentLocation: 'limassol'
  },
  {
    id: 'parekklisia',
    name: {
      en: 'Parekklisia',
      el: 'Παρεκκλησιά',
      ru: 'Парекклисия'
    },
    description: {
      en: 'Fresh farm goods delivery in Parekklisia, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στην Παρεκκλησιά, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Парекклисии, Кипр'
    },
    slug: 'parekklisia',
    parentLocation: 'limassol'
  },
  {
    id: 'ayios-tychonas',
    name: {
      en: 'Ayios Tychonas',
      el: 'Άγιος Τύχωνας',
      ru: 'Айос Тихонас'
    },
    description: {
      en: 'Fresh farm goods delivery in Ayios Tychonas, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στον Άγιο Τύχωνα, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Айосе Тихонасе, Кипр'
    },
    slug: 'ayios-tychonas',
    parentLocation: 'limassol'
  },
  {
    id: 'palodia',
    name: {
      en: 'Palodia',
      el: 'Παλοδιά',
      ru: 'Палотья'
    },
    description: {
      en: 'Fresh farm goods delivery in Palodia, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στην Παλοδιά, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Палотье, Кипр'
    },
    slug: 'palodia',
    parentLocation: 'limassol'
  },
  {
    id: 'agros',
    name: {
      en: 'Agros',
      el: 'Αγρός',
      ru: 'Агрос'
    },
    description: {
      en: 'Fresh farm goods delivery in Agros, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στον Αγρό, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Агросе, Кипр'
    },
    slug: 'agros',
    parentLocation: 'limassol'
  },
  {
    id: 'kyperounta',
    name: {
      en: 'Kyperounta',
      el: 'Κυπερούντα',
      ru: 'Киперунта'
    },
    description: {
      en: 'Fresh farm goods delivery in Kyperounta, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στην Κυπερούντα, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Киперунте, Кипр'
    },
    slug: 'kyperounta',
    parentLocation: 'limassol'
  },
  {
    id: 'platres',
    name: {
      en: 'Platres',
      el: 'Πλάτρες',
      ru: 'Платрес'
    },
    description: {
      en: 'Fresh farm goods delivery in Platres, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στους Πλάτρες, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Платресе, Кипр'
    },
    slug: 'platres',
    parentLocation: 'limassol'
  },
  {
    id: 'omodos',
    name: {
      en: 'Omodos',
      el: 'Όμοδος',
      ru: 'Омодос'
    },
    description: {
      en: 'Fresh farm goods delivery in Omodos, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στον Όμοδο, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Омодосе, Кипр'
    },
    slug: 'omodos',
    parentLocation: 'limassol'
  },
  {
    id: 'pera-pedi',
    name: {
      en: 'Pera Pedi',
      el: 'Πέρα Πεδί',
      ru: 'Пера Педи'
    },
    description: {
      en: 'Fresh farm goods delivery in Pera Pedi, Cyprus',
      el: 'Παράδοση φρέσκων αγροτικών προϊόντων στο Πέρα Πεδί, Κύπρο',
      ru: 'Доставка свежих фермерских продуктов в Пера Педи, Кипр'
    },
    slug: 'pera-pedi',
    parentLocation: 'limassol'
  }
];