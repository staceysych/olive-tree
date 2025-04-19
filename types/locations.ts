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
  }
]; 