import { EventBus } from "../events";
import { Command, OnCommandEvent } from "../types";
import { BotEvents } from '../botEvents';
import { CommandRegistry } from "./commandRegistry";
import { _SoundEffect } from "./commands";

export class CommandMonitor {
  constructor() {
    CommandRegistry.init()

    EventBus.eventEmitter.addListener(BotEvents.OnCommand,
      (onCommandEvent: OnCommandEvent) => this.handleCommand(onCommandEvent))
  }

  private handleCommand(onCommandEvent: OnCommandEvent) {
    const command: Command | undefined = CommandRegistry.getCommand(onCommandEvent.command)
    if (command) {
      command.command(onCommandEvent)
    } else {
      _SoundEffect(onCommandEvent)
    }
  }
}