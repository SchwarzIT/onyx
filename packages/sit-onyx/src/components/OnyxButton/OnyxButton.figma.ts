import { figma, html } from "@figma/code-connect/html";

figma.connect("<BASE_URL>?node-id=635-29719", {
  imports: ['import { OnyxButton } from "sit-onyx";'],
  props: {
    label: figma.string("label"),
    color: figma.string("color"),
    mode: figma.string("mode"),
    disabled: figma.enum("state", { disabled: true }),
    loading: figma.enum("state", { loading: true }),
    skeleton: figma.enum("state", { skeleton: true }),
    iconPosition: figma.boolean("show trailing icon", { true: "right" }),
  },
  example: (props) =>
    html`<OnyxButton
      label=${props.label}
      color=${props.color}
      mode=${props.mode}
      disabled=${props.disabled}
      loading=${props.loading}
      skeleton=${props.skeleton}
      iconPosition=${props.iconPosition}
    />`,
});
