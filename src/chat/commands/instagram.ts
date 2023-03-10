import { OnCommandEvent, OnSayEvent } from '../../types'
import { BotEvents } from '../../botEvents'
import { ShouldThrottle } from '../../shouldThrottle'
import { EventBus } from '../../events'

/**
 * Sends a message to chat with info on BBB Instagram
 * @param onCommandEvent 
 */
export function instagram(onCommandEvent: OnCommandEvent): void {

  const cooldownSeconds = 300

  // The broadcaster is allowed to bypass throttling. Otherwise,
  // only proceed if the command hasn't been used within the cooldown.
  if (!onCommandEvent.flags.broadcaster &&
    ShouldThrottle(onCommandEvent.extra.sinceLastCommand, cooldownSeconds, true)) {
    return
  }

  const message = `Follow BBB on Instagram at https://www.instagram.com/baldbeardedbuilder`

  // Send the message to Twitch chat
  EventBus.eventEmitter.emit(BotEvents.OnSay, new OnSayEvent(message))
}