import type { Events } from "vue";

// prettier-ignore
type EventName<T extends Event> = 
  T extends ClipboardEvent ? "ClipboardEvent"
: T extends WheelEvent ? "WheelEvent"
: T extends PointerEvent ? "PointerEvent"
: T extends DragEvent ? "DragEvent"
: T extends MouseEvent ? "MouseEvent"
: T extends CompositionEvent ? "CompositionEvent"
: T extends FocusEvent ? "FocusEvent"
: T extends KeyboardEvent ? "KeyboardEvent"
: T extends TouchEvent ? "TouchEvent"
: T extends AnimationEvent ? "AnimationEvent"
: T extends TransitionEvent ? "TransitionEvent"
: "Event";

/**
 * Removes a prefix from a string type.
 * @example ```ts
 * type Trimmed = TrimStart<"onclick", "on">;
 * const trimmed: Trimmed = "click";
 * ```
 */
type TrimStart<
  TString extends string,
  Prefix extends string,
> = TString extends `${Prefix}${infer Base}` ? Base : TString;

type EventDocMap = {
  [Key in keyof Events]: {
    constructor: Docs<EventName<Events[Key]>>;
    event: Docs<Lowercase<TrimStart<Key, "on">>>;
  };
};

/**
 * The doc type ensures that a name has a valid URL that includes the name.
 */
type Docs<Name extends string> = {
  name: Name;
  url: `${string}${Name}${string}`;
};

export const EVENT_DOC_MAP: EventDocMap = {
  onCopy: {
    constructor: {
      name: "ClipboardEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent",
    },
    event: {
      name: "copy",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/copy_event",
    },
  },
  onCut: {
    constructor: {
      name: "ClipboardEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent",
    },
    event: {
      name: "cut",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/cut_event",
    },
  },
  onPaste: {
    constructor: {
      name: "ClipboardEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/ClipboardEvent",
    },
    event: {
      name: "paste",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/paste_event",
    },
  },
  onCompositionend: {
    constructor: {
      name: "CompositionEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent",
    },
    event: {
      name: "compositionend",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event",
    },
  },
  onCompositionstart: {
    constructor: {
      name: "CompositionEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent",
    },
    event: {
      name: "compositionstart",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event",
    },
  },
  onCompositionupdate: {
    constructor: {
      name: "CompositionEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/CompositionEvent",
    },
    event: {
      name: "compositionupdate",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event",
    },
  },
  onDrag: {
    constructor: {
      name: "DragEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/DragEvent",
    },
    event: {
      name: "drag",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drag_event",
    },
  },
  onDragend: {
    constructor: {
      name: "DragEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/DragEvent",
    },
    event: {
      name: "dragend",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragend_event",
    },
  },
  onDragenter: {
    constructor: {
      name: "DragEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/DragEvent",
    },
    event: {
      name: "dragenter",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragenter_event",
    },
  },
  onDragexit: {
    constructor: {
      name: "DragEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/DragEvent",
    },
    event: {
      name: "dragexit",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragexit_event",
    },
  },
  onDragleave: {
    constructor: {
      name: "DragEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/DragEvent",
    },
    event: {
      name: "dragleave",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragleave_event",
    },
  },
  onDragover: {
    constructor: {
      name: "DragEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/DragEvent",
    },
    event: {
      name: "dragover",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragover_event",
    },
  },
  onDragstart: {
    constructor: {
      name: "DragEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/DragEvent",
    },
    event: {
      name: "dragstart",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dragstart_event",
    },
  },
  onDrop: {
    constructor: {
      name: "DragEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/DragEvent",
    },
    event: {
      name: "drop",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/drop_event",
    },
  },
  onFocus: {
    constructor: {
      name: "FocusEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent",
    },
    event: {
      name: "focus",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/focus_event",
    },
  },
  onFocusin: {
    constructor: {
      name: "FocusEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent",
    },
    event: {
      name: "focusin",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event",
    },
  },
  onFocusout: {
    constructor: {
      name: "FocusEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent",
    },
    event: {
      name: "focusout",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/focusout_event",
    },
  },
  onBlur: {
    constructor: {
      name: "FocusEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent",
    },
    event: {
      name: "blur",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/blur_event",
    },
  },
  onChange: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "change",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event",
    },
  },
  onBeforeinput: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "beforeinput",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/beforeinput_event",
    },
  },
  onInput: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "input",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event",
    },
  },
  onReset: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "reset",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset_event",
    },
  },
  onSubmit: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "submit",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event",
    },
  },
  onInvalid: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "invalid",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event",
    },
  },
  onLoad: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "load",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event",
    },
  },
  onError: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "error",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/error_event",
    },
  },
  onKeydown: {
    constructor: {
      name: "KeyboardEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent",
    },
    event: {
      name: "keydown",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event",
    },
  },
  onKeypress: {
    constructor: {
      name: "KeyboardEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent",
    },
    event: {
      name: "keypress",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/keypress_event",
    },
  },
  onKeyup: {
    constructor: {
      name: "KeyboardEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent",
    },
    event: {
      name: "keyup",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/keyup_event",
    },
  },
  onAuxclick: {
    constructor: {
      name: "MouseEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent",
    },
    event: {
      name: "auxclick",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/auxclick_event",
    },
  },
  onClick: {
    constructor: {
      name: "MouseEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent",
    },
    event: {
      name: "click",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event",
    },
  },
  onContextmenu: {
    constructor: {
      name: "MouseEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent",
    },
    event: {
      name: "contextmenu",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event",
    },
  },
  onDblclick: {
    constructor: {
      name: "MouseEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent",
    },
    event: {
      name: "dblclick",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event",
    },
  },
  onMousedown: {
    constructor: {
      name: "MouseEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent",
    },
    event: {
      name: "mousedown",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event",
    },
  },
  onMouseenter: {
    constructor: {
      name: "MouseEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent",
    },
    event: {
      name: "mouseenter",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event",
    },
  },
  onMouseleave: {
    constructor: {
      name: "MouseEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent",
    },
    event: {
      name: "mouseleave",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event",
    },
  },
  onMousemove: {
    constructor: {
      name: "MouseEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent",
    },
    event: {
      name: "mousemove",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/mousemove_event",
    },
  },
  onMouseout: {
    constructor: {
      name: "MouseEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent",
    },
    event: {
      name: "mouseout",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseout_event",
    },
  },
  onMouseover: {
    constructor: {
      name: "MouseEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent",
    },
    event: {
      name: "mouseover",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseover_event",
    },
  },
  onMouseup: {
    constructor: {
      name: "MouseEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent",
    },
    event: {
      name: "mouseup",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseup_event",
    },
  },
  onAbort: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "abort",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/abort_event",
    },
  },
  onCanplay: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "canplay",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplay_event",
    },
  },
  onCanplaythrough: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "canplaythrough",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplaythrough_event",
    },
  },
  onDurationchange: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "durationchange",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/durationchange_event",
    },
  },
  onEmptied: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "emptied",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/emptied_event",
    },
  },
  onEncrypted: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "encrypted",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/encrypted_event",
    },
  },
  onEnded: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "ended",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event",
    },
  },
  onLoadeddata: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "loadeddata",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadeddata_event",
    },
  },
  onLoadedmetadata: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "loadedmetadata",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadedmetadata_event",
    },
  },
  onLoadstart: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "loadstart",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/loadstart_event",
    },
  },
  onPause: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "pause",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause_event",
    },
  },
  onPlay: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "play",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play_event",
    },
  },
  onPlaying: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "playing",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/playing_event",
    },
  },
  onProgress: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "progress",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/progress_event",
    },
  },
  onRatechange: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "ratechange",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ratechange_event",
    },
  },
  onSeeked: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "seeked",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeked_event",
    },
  },
  onSeeking: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "seeking",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/seeking_event",
    },
  },
  onStalled: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "stalled",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/stalled_event",
    },
  },
  onSuspend: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "suspend",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/suspend_event",
    },
  },
  onTimeupdate: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "timeupdate",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/timeupdate_event",
    },
  },
  onVolumechange: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "volumechange",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/volumechange_event",
    },
  },
  onWaiting: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "waiting",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/waiting_event",
    },
  },
  onSelect: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "select",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/select_event",
    },
  },
  onScroll: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "scroll",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/scroll_event",
    },
  },
  onScrollend: {
    constructor: { name: "Event", url: "https://developer.mozilla.org/en-US/docs/Web/API/Event" },
    event: {
      name: "scrollend",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollend_event",
    },
  },
  onTouchcancel: {
    constructor: {
      name: "TouchEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent",
    },
    event: {
      name: "touchcancel",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/touchcancel_event",
    },
  },
  onTouchend: {
    constructor: {
      name: "TouchEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent",
    },
    event: {
      name: "touchend",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/touchend_event",
    },
  },
  onTouchmove: {
    constructor: {
      name: "TouchEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent",
    },
    event: {
      name: "touchmove",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/touchmove_event",
    },
  },
  onTouchstart: {
    constructor: {
      name: "TouchEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent",
    },
    event: {
      name: "touchstart",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/touchstart_event",
    },
  },
  onPointerdown: {
    constructor: {
      name: "PointerEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent",
    },
    event: {
      name: "pointerdown",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerdown_event",
    },
  },
  onPointermove: {
    constructor: {
      name: "PointerEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent",
    },
    event: {
      name: "pointermove",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event",
    },
  },
  onPointerup: {
    constructor: {
      name: "PointerEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent",
    },
    event: {
      name: "pointerup",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerup_event",
    },
  },
  onPointercancel: {
    constructor: {
      name: "PointerEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent",
    },
    event: {
      name: "pointercancel",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/pointercancel_event",
    },
  },
  onPointerenter: {
    constructor: {
      name: "PointerEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent",
    },
    event: {
      name: "pointerenter",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerenter_event",
    },
  },
  onPointerleave: {
    constructor: {
      name: "PointerEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent",
    },
    event: {
      name: "pointerleave",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerleave_event",
    },
  },
  onPointerover: {
    constructor: {
      name: "PointerEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent",
    },
    event: {
      name: "pointerover",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerover_event",
    },
  },
  onPointerout: {
    constructor: {
      name: "PointerEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent",
    },
    event: {
      name: "pointerout",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerout_event",
    },
  },
  onWheel: {
    constructor: {
      name: "WheelEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent",
    },
    event: {
      name: "wheel",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/wheel_event",
    },
  },
  onAnimationstart: {
    constructor: {
      name: "AnimationEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent",
    },
    event: {
      name: "animationstart",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/animationstart_event",
    },
  },
  onAnimationend: {
    constructor: {
      name: "AnimationEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent",
    },
    event: {
      name: "animationend",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/animationend_event",
    },
  },
  onAnimationiteration: {
    constructor: {
      name: "AnimationEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/AnimationEvent",
    },
    event: {
      name: "animationiteration",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/animationiteration_event",
    },
  },
  onTransitionend: {
    constructor: {
      name: "TransitionEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent",
    },
    event: {
      name: "transitionend",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event",
    },
  },
  onTransitionstart: {
    constructor: {
      name: "TransitionEvent",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/TransitionEvent",
    },
    event: {
      name: "transitionstart",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionstart_event",
    },
  },
};
