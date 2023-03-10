import { OnCommandEvent, OnSayEvent } from '../../types'
import { BotEvents } from '../../botEvents'
import { ShouldThrottle } from '../../shouldThrottle'
import { EventBus } from '../../events'

/**
 * Sends a message to chat re: the Live Coders team
 * @param onCommandEvent 
 */
export function liveCoders(onCommandEvent: OnCommandEvent): void {

  const cooldownSeconds = 300

  // The broadcaster is allowed to bypass throttling. Otherwise,
  // only proceed if the command hasn't been used within the cooldown.
  if (!onCommandEvent.flags.broadcaster &&
    ShouldThrottle(onCommandEvent.extra.sinceLastCommand, cooldownSeconds, true)) {
    return
  }

  const message = `Check out the entire Live Coders team and give them all a follow at https://livecoders.dev`

  // Send the message to Twitch chat
  EventBus.eventEmitter.emit(BotEvents.OnSay, new OnSayEvent(message))
}