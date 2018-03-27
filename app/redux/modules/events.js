
export const layAbout = {
  name: 'Just lay about',
  toSucceed: (hero) => {
    return true
  },
  onSuccess: {
  },
  onFailure: {
  },
  description: `Do absolutely nothing. It has no effect.`
};

export const cleanStables = {
  name: 'Clean the stables of Augeas',
  toSucceed: (hero) => {
    return hero.stats.strength > 5
  },
  onSuccess: {
    compassion: 2
  },
  onFailure: {
    intelligence: -1
  },
  description: `Gross. You need a strength of at least 5.`
};

export const drinkNectar = {
  name: 'Drink nectar of the gods',
  toSucceed: (hero) => {
    return hero.stats.intelligence > 2
  },
  onSuccess: {
    strength: 4
  },
  onFailure: {
    strength: -2
  },
  description: `Gross. You need a strength of at least 5.`
};

export const slayLion = {
  name: 'Slay the Nemean lion',
  toSucceed: (hero) => {
    return hero.stats.intelligence > 2
  },
  onSuccess: {
    strength: 4
  },
  onFailure: {
    strength: -2
  },
  description: `Gross. You need a strength of at least 5.`
};

export const fightGiants = {
  name: 'Fight the Frost Giants',
  toSucceed: (hero) => {
    return hero.stats.intelligence > 2
  },
  onSuccess: {
    strength: 4
  },
  onFailure: {
    strength: -2
  },
  description: `Gross. You need a strength of at least 5.`
};

export const killZeus = {
  name: 'Kill Zeus',
  toSucceed: (hero) => {
    return hero.stats.intelligence > 2
  },
  onSuccess: {
    strength: 4
  },
  onFailure: {
    strength: -2
  },
  description: `Gross. You need a strength of at least 5.`
};

export const killOdin = {
  name: 'Kill Odin',
  toSucceed: (hero) => {
    return hero.stats.intelligence > 2
  },
  onSuccess: {
    strength: 4
  },
  onFailure: {
    strength: -2
  },
  description: `Gross. You need a strength of at least 5.`
};

export const killYahweh = {
  name: 'Kill Yahweh',
  toSucceed: (hero) => {
    return hero.stats.intelligence > 2
  },
  onSuccess: {
    strength: 4
  },
  onFailure: {
    strength: -2
  },
  description: `Gross. You need a strength of at least 5.`
};

export const killAnubis = {
  name: 'Kill Anubis',
  toSucceed: (hero) => {
    return hero.stats.intelligence > 2
  },
  onSuccess: {
    strength: 4
  },
  onFailure: {
    strength: -2
  },
  description: `Gross. You need a strength of at least 5.`
};

export const killKrishna = {
  name: 'Kill Krishna',
  toSucceed: (hero) => {
    return hero.stats.intelligence > 2
  },
  onSuccess: {
    strength: 4
  },
  onFailure: {
    strength: -2
  },
  description: `Gross. You need a strength of at least 5.`
};

export const quit = {
  name: 'Quit',
  toSucceed: (hero) => {
    return hero.stats.intelligence > 2
  },
  onSuccess: {
    strength: 4
  },
  onFailure: {
    strength: -2
  },
  description: `Gross. You need a strength of at least 5.`
};