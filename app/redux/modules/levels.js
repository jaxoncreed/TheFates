
import {
  weakHercules,
  hercules,
  thor,
  fates
} from './heroes';

import {
  layAbout,
  cleanStables,
  drinkNectar,
  fightGiants,
  slayLion,
  killKrishna,
  killAnubis,
  killOdin,
  killYahweh,
  killZeus,
  quit
} from './events';

const Zeus = {
  image: 'Zeus.png'
}
const Fates = {
  image: 'Fates.png'
}
const Odin = {
  image: 'Odin.png'
}
const Nietzsche = {
  image: 'Nietzsche.png'
}
const Demon = {
  image: 'Demon.png'
}
const Who = {
  image: 'Who.png'
}

const levels = [
  // Zeus Simple mission
  {
    background: 'Wimkqo8gDZ0',
    music: 'kHRifL5S1m8',
    preDialog: [
      {
        character: Zeus,
        text: `Ah! The legendary Fates! I've been looking all over for you.`
      },
      {
        character: Fates,
        text: `What do you want Zeus?`
      },
      {
        character: Zeus,
        text: `Oh come now. What's with that attitude. Don't you have time for some pleasantries?`
      },
      {
        character: Fates,
        text: `We're very busy.`
      },
      {
        character: Zeus,
        text: `Well all right then. I've made a new contract for your next narrative.`
      },
      {
        character: Zeus,
        text: `You see, my son, Hercules, has been kind-of a brat lately, and he won't clean his stables.`
      },
      {
        character: Zeus,
        text: `So, I took away his god power privileges until he gets his act together.`
      },
      {
        character: Zeus,
        text: `But, now he's just spending time pouting and the stables still aren't clean!`
      },
      {
        character: Zeus,
        text: `Could you maybe work some of your story magic and make him get off his butt?`
      },
      {
        character: Fates,
        text: `But, isn't he too weak to clean since you took away his god power?`
      },
      {
        character: Zeus,
        text: `Hmmm. I suppose you're right.`
      },
      {
        character: Zeus,
        text: `What if you just gave him the strength in your story? That would work right?`
      },
      {
        character: Fates,
        text: `Fine. We'll do it. Give us your contract.`
      },
      {
        character: Zeus,
        text: `You guys are lifesavers.`
      },
      {
        character: Zeus,
        text: `Without you I might have to actually do parenting!`
      }
    ],
    game: {
      heroes: [ weakHercules ],
      events: [ layAbout, drinkNectar, cleanStables ],
      winCondition: (timelines) => {
        return false;
      }
    },
    postDialog: [
      {
        character: Zeus,
        text: `Oh that's very good!`
      },
      {
        character: Zeus,
        text: `Now that Herc isn't a lazy drain on my pocketbook. It might be nice for him to finally take care of that vermin lion for me.`
      },
      {
        character: Zeus,
        text: `But, that lion's crafty, and Hercules isn't all that smart.`
      },
      {
        character: Zeus,
        text: `How could he possibly defeat it?`
      },
      {
        character: Who,
        text: `I might have a solution!`
      },
      {
        character: Zeus,
        text: `Hmm?`
      },
    ]
  },
  // Zeus Odin Complex mission
  {
    background: '64Yo1Rz2b40',
    music: 'V5Watai4qPM',
    preDialog: [
      {
        character: Odin,
        text: `How's it going old friend?`
      },
      {
        character: Zeus,
        text: `Ah Odin! So great to see you. I was just talking to the fates here about helping my son do some chores.`
      },
      {
        character: Odin,
        text: `What a coincidence. My son, Thor, has some chores to do too. There are some pesky frost giants he needs to defeat.`
      },
      {
        character: Zeus,
        text: `How's Thor doing?`
      },
      {
        character: Odin,
        text: `Well, not that well. He's not strong enough to defeat them.`
      },
      {
        character: Zeus,
        text: `Ha! You know my Hercules is very strong. Maybe he could give your boy a few pointers.`
      },
      {
        character: Odin,
        text: `Hey, yeah! And while we're at it, the Fates could make a story where Thor gives Hercules some intelligence.`
      },
      {
        character: Zeus,
        text: `That's a grand idea! You heard the man, Fates. Chop chop!`
      },
    ],
    game: {
      heroes: [ hercules, thor ],
      events: [ layAbout, fightGiants, slayLion ],
      winCondition: (timelines) => {
        return false;
      }
    },
    postDialog: [
      {
        character: Odin,
        text: `Well that went wonderfully!`
      },
      {
        character: Zeus,
        text: `Okay, what's the next contract for the Fates?`
      },
      {
        character: Who,
        text: 'N...'
      },
      {
        character: Who,
        text: 'I...'
      },
      {
        character: Zeus,
        text: `What's that?`
      },
      {
        character: Who,
        text: `E...`
      },
      {
        character: Who,
        text: `T...`
      },
      {
        character: Odin,
        text: `I have no idea.`
      }
    ]
  },
  // Nietzsche Mission
  {
    background: 'ZSGh1IstVsE',
    music: '3YOYlgvI1uE',
    preDialog: [
      {
        character: Who,
        text: `Z... S... C... H... E!`
      },
      {
        character: Nietzsche,
        text: `WAAAAZZZZZZZZZUUUUUPPPPPPPPPP!!!!!`
      },
      {
        character: Nietzsche,
        text: `It's me, Nietzsche!`
      },
      {
        character: Zeus,
        text: `Nietzsche?`
      },
      {
        character: Nietzsche,
        text: `That's right! Nietzsche the god killer!`
      },
      {
        character: Odin,
        text: `Are you saying that you've come to kill us?`
      },
      {
        character: Nietzsche,
        text: `You best believe it.`
      },
      {
        character: Odin,
        text: `HAHAHAHAHAHAHAHAHA!!`
      },
      {
        character: Zeus,
        text: `HAHAHAHAHAHAHAHA!!`
      },
      {
        character: Zeus,
        text: `How are you going to do that? You are just a small mortal.`
      },
      {
        character: Nietzsche,
        text: `Oh! I've been working my way to übermmensch status for a long time, and I think I finally have a solution to take you two down.`
      },
      {
        character: Nietzsche,
        text: `I might not be able to kill you directly, but I have right here the next contract for the Fates.`
      },
      {
        character: Nietzsche,
        text: `And they're going to craft a story that kills both of you.`
      },
      {
        character: Odin,
        text: `That isn't possible is it?`
      },
      {
        character: Fates,
        text: `I'm afraid it is. And a contract's a contract.`
      },
      {
        character: Nietzsche,
        text: `Haha! Prepare to meet your demise! And at the hands of your own children too.`
      },
      {
        character: Zeus,
        text: `No! Fates, don't do this!`
      },
      {
        character: Fates,
        text: `It's too late. We're sorry.`
      }
    ],
    game: {
      heroes: [ hercules, thor ],
      events: [ layAbout, drinkNectar, killZeus, killOdin ],
      winCondition: (timelines) => {
        return false;
      }
    },
    postDialog: [
      {
        character: Nietzsche,
        text: `They're... dead...`
      },
      {
        character: Nietzsche,
        text: `God is dead.`
      },
      {
        character: Nietzsche,
        text: `I did it.`
      },
      {
        character: Nietzsche,
        text: `haha`
      },
      {
        character: Nietzsche,
        text: `Hahahaha`
      },
      {
        character: Nietzsche,
        text: `HAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHA!`
      },
      {
        character: Nietzsche,
        text: `And now my transformation to the übermensche...`
      },
      {
        character: Nietzsche,
        text: `IS...`
      },
      {
        character: Nietzsche,
        text: `COMPLETE!!!`
      },
    ]
  },
  // Final Mission
  {
    background: 'TlPBhrsllYo',
    music: '9pRlgLtGh3g',
    preDialog: [
      {
        character: Demon,
        text: 'AAAAAAAAAAAAAAAAAAAAAAAAAAA!!!!!!!!!!'
      },
      {
        character: Demon,
        text: 'I can feel their prowess coursing through my veins!'
      },
      {
        character: Demon,
        text: 'The more gods I consume the more powerful I become!'
      },
      {
        character: Demon,
        text: `And you, Fates. Thank's for working with me.`
      },
      {
        character: Demon,
        text: `But, there's so much left to do. So much... well...`
      },
      {
        character: Demon,
        text: `We'll call it teamwork.`
      },
      {
        character: Demon,
        text: `Just as encounters in your stories can make heros stronger. My encounter with you has made me strong beyond comprehension.`
      },
      {
        character: Demon,
        text: `But, why stop there?`
      },
      {
        character: Demon,
        text: `Humans are always creating gods, and there are so many to consume.`
      },
      {
        character: Demon,
        text: `It is now your... fate, to destroy more gods.`
      },
      {
        character: Demon,
        text: `Go! and make me stronger!`
      },
    ],
    game: {
      heroes: [ hercules, thor, fates ],
      events: [ layAbout, drinkNectar, killAnubis, killYahweh, killKrishna, quit ],
      winCondition: (timelines) => {
        return false;
      }
    },
    postDialog: [
      {
        character: Fates,
        text: 'Hey Nietzsche! We quit!'
      }
    ]
  },
  // Free play
  {
    background: 'WKB0JUkksJg',
    music: 'cDyfSGmHwqY',
    preDialog: [
      {
        character: Demon,
        text: 'You... quit?'
      },
      {
        character: Fates,
        text: `Yeah. We won't be making any more stories for you.`
      },
      {
        character: Demon,
        text: 'But... why? We were such a good team?'
      },
      {
        character: Fates,
        text: `No. We weren't.`
      },
      {
        character: Fates,
        text: `When two great powers encounter each-other they're supposed to help one another.`
      },
      {
        character: Fates,
        text: `But, that didn't happen with Zeus. It didn't happen with Odin.`
      },
      {
        character: Fates,
        text: `And it didn't happen with you.`
      },
      {
        character: Demon,
        text: `I... I don't understand`
      },
      {
        character: Fates,
        text: `To be a team we have to mutually benefit.`
      },
      {
        character: Fates,
        text: `But, all of you only wanted to use us to do your bidding.`
      },
      {
        character: Demon,
        text: `Oh. I see.`
      },
      {
        character: Nietzsche,
        text: `...`
      },
      {
        character: Nietzsche,
        text: `It's funny.`
      },
      {
        character: Nietzsche,
        text: `My whole life I was trying to become the übermensche, but I never realized...`
      },
      {
        character: Nietzsche,
        text: `you can't be the übermensche alone.`
      },
      {
        character: Nietzsche,
        text: `and in my lust for power, I mistreated you all...`
      },
      {
        character: Nietzsche,
        text: `while leaving a wake of destruction in my path.`
      },
      {
        character: Nietzsche,
        text: `...`
      },
      {
        character: Nietzsche,
        text: `Go on. You're free.`
      },
      {
        character: Nietzsche,
        text: `Free to make your own story.`
      },
      {
        character: Nietzsche,
        text: `No more contracts.`
      },
      {
        character: Nietzsche,
        text: `I won't get in your way anymore.`
      },
      {
        character: Fates,
        text: `...`
      },
      {
        character: Fates,
        text: `Hey, Nietzsche...`
      },
      {
        character: Fates,
        text: `All things considered. You're still an übermensche to us.`
      },
      {
        character: Nietzsche,
        text: `Ha...`
      },
      {
        character: Nietzsche,
        text: `See ya around.`
      },
      {
        character: Fates,
        text: `Yeah... See ya.`
      },
    ],
    game: {
      heroes: [ hercules, thor, fates ],
      events: [ layAbout, drinkNectar, killAnubis, killYahweh, killKrishna, quit, killOdin, killZeus, slayLion, fightGiants ],
      winCondition: (timelines) => {
        return false;
      }
    },
    postDialog: [
      {
        character: Nietzsche,
        text: 'Thanks for being a teammate.'
      }
    ],
    isFreePlay: true
  },
];

export default levels;
