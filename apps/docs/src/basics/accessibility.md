# Accessibility

Web accessibility guidelines and laws are crucial for ensuring that the digital content is inclusive and accessible to individuals with disabilities.

## WCAG

[The Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/UNDERSTANDING-WCAG20/intro.html#introduction-fourprincs-head) developed by the Web Accessibility Initiative (WAI), are a set of guidelines which purpose is to provide a comprehensive intentionally recognized framework for making web content more accessible.

::: info
The WCAG are split into three levels:

- A (lowest)
- AA (mid-range)
- AAA (highest)
  :::

To make sure products are accessible to everyone, onyx is committed to follow the four principles of the Web Content Accessibility Guidelines as well as being compliant with level `AA` for all of our components:

- **Perceivable**: It can be perceived by at least one of a person's senses.
- **Operable**: All interactions are operable through a variation of input methods.
- **Understandable**: Information and operation of the interface must be understandable.
- **Robust**: Content can be interpreted by a variety of assistive technologies and withstand changes in these technologies.

## Assistive technology

Assistive technology enhances the functional abilities of individuals with disabilities, promoting increased independence. Supporting devices such as keyboards and screen readers support people when interacting with technology.

### Keyboard support

UI components from the onyx design system offer full keyboard support. This not just aligns to the WCAG but also allows the user to navigate alternatively to the cursor and enhances efficiency for power users.

### Screen readers

A screen reader is a software (mostly integrated natively in your browser) that either uses braille display or reads text aloud. In common, the program identifies and localizes **visible and hidden** content (including paragraphs, buttons and alternative texts) which leads to an accessible handling of the content and components.

#### Structure & Hierarchy

It is important to understand the view of a screen reader to apply it to a web application. Streamlining navigation enhances the user's understanding of app structures and prioritization of essential information. Employing various visual and textual cues (including color, shape, text, and motion) contributes to clarity by emphasizing important content.

![reading conventions of a screenreader from left to right](/assets/structure.webp)

Recognizing that each added element increases UI complexity, strive for simplicity by incorporating clearly visible elements, adequate contrast and size, a hierarchical layout, and key information readily discernable at a glance. Organize important actions strategically, placing them at the screen's top or bottom for accessibility, and group related items with similar importance side by side. This approach ensures a more intuitive and user-friendly UI interpretation.

## Color & contrast

In adhering to AA/AAA accessibility standards, the onyx color palette is meticulously preconfigured and readily available for implementation. However, achieving high contrast relies not just on color selection but on utilizing the appropriate shades within the chosen colors. It's imperative to strike a balance by employing two complementary colors — one from the lighter spectrum and another from the darker spectrum of the palette — especially when dealing with text and background elements.

![high contrast compared to low contrast](/assets/contrast.webp)

Furthermore, an effective strategy involves adopting the traffic light color system to harmonize content and visuals seamlessly. This system, inspired by the familiar traffic light colors, ensures a coherent and visually intuitive combination, enhancing not only accessibility but also the overall user experience.

## Notifications

Ensuring a transparent and communicative user experience involves providing timely feedback on screen interactions. It's essential for users to be informed about the success or failure of their actions. Employing diverse feedback mechanisms amplifies user understanding, and incorporating components such as toast messages, notifications, error labels, and icons proves to be highly effective.

The use of a toast component offers subtle, non-intrusive messages that appear briefly, notifying users without disrupting their flow. Notifications, on the other hand, provide more detailed and persistent feedback, offering clarity on the outcome of their interactions.
Error messaging through labels plays a crucial role in guiding users when issues arise, presenting information in a clear and comprehensible manner. Icons serve as visual indicators, enhancing the communicative aspect of feedback.

![example of feedback: toast message](/assets/feedback.webp)

In addition, integrating these feedback components with the traffic light color system adds a layer of accessibility refinement. Aligning feedback with this system—using colors like green for success, yellow for warnings, and red for errors— creates a cohesive and universally recognizable visual language. This not only ensures that users are promptly informed about their actions but also contributes to an inclusive and user-friendly interface.

### Skeletons

When a website is in the process of loading, providing feedback through skeleton states is an effective strategy to manage user expectations and maintain their patience. These skeletal representations serve as placeholders during the loading phase, offering users a visual cue of the forthcoming content. Importantly, skeletons are designed to be visible only during the loading period, ensuring a seamless transition into a fully interactive UI once the content has loaded completely. This thoughtful approach not only keeps users engaged by offering a glimpse of the forthcoming content but also guarantees a smooth and responsive user experience as the interface transforms into its fully functional state post-loading.

![example of a skeleton state appearance](/assets/skeleton.webp)

### Loading indicators

In the realm of user experience, loading states are essential for individual components. It's crucial to differentiate them from skeleton states: loading states signify ongoing processes within a component's content, while skeletons indicate the entire component (including its structure) is loading. These states collectively contribute to user-centric transparency, ensuring that users stay informed and engaged during various loading stages.

![example of a loading indicator inside a button](/assets/loading.webp)
