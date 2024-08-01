# Component quality stages

This page describes which perspective must be taken into consideration when creating components in **onyx**.

## Essentials: Concept handover

| Description                                                                 | UX/UI | DEV |
| :-------------------------------------------------------------------------- | :---: | :-: |
| Defined responsive behavior for all breakpoints                             |  🧑‍🎨   |  -  |
| Defined architectural structure of component                                |  🧑‍🎨   |  -  |
| Neutral color theme is used                                                 |  🧑‍🎨   |  -  |
| Defined density behavior: compact, default, cozy                            |  🧑‍🎨   |  -  |
| Defined slots and functions                                                 |  🧑‍🎨   | 🧑‍💻  |
| Defined states: hover / disabled / active /...                              |  🧑‍🎨   | 🧑‍💻  |
| Component design fits our principles                                        |  🧑‍🎨   | 🧑‍💻  |
| Design tokens are used                                                      |  🧑‍🎨   | 🧑‍💻  |
| Considers darkmode / lightmode                                              |   -   | 🧑‍💻  |
| Defined basic layout in figma design                                        |   -   | 🧑‍💻  |
| Market research / internal experience exchange was performed                |   -   | 🧑‍💻  |
| Component API fits our [technical guidelines](/principles/technical-vision) |   -   | 🧑‍💻  |

## Essentials: MVP component release

| Description                                                          | UX/UI | DEV |
| :------------------------------------------------------------------- | :---: | :-: |
| Defined keyboard interactivity                                       |  🧑‍🎨   |  -  |
| Other light + dark color themes are applied                          |  🧑‍🎨   |  -  |
| Provided textual documentation + property description (in Storybook) |  🧑‍🎨   |  -  |
| Classification into component groups                                 |  🧑‍🎨   |  -  |
| Functional figma component is created in library                     |  🧑‍🎨   |  -  |
| UX approval of coded component                                       |  🧑‍🎨   |  -  |
| A11y level A / barrier free                                          |  🧑‍🎨   | 🧑‍💻  |
| DEV + UX aligned the naming                                          |  🧑‍🎨   | 🧑‍💻  |
| Verify keyboard interactivity                                        |   -   | 🧑‍💻  |
| Prime behavior covered by playwright                                 |   -   | 🧑‍💻  |
| Screenshot tests (dark + light) were created                         |   -   | 🧑‍💻  |
| Component is fully documented (props, slots, ...) in Storybook       |   -   | 🧑‍💻  |
| Used clean SCSS naming (BEM)                                         |   -   | 🧑‍💻  |
| Verified HTML standards (tag names, prop names, behavior, ...)       |   -   | 🧑‍💻  |
| Used clean code                                                      |   -   | 🧑‍💻  |

## Final expansion stage of a component

| Description                                                                                             | UX/UI | DEV |
| :------------------------------------------------------------------------------------------------------ | :---: | :-: |
| Figma library clean-up + sorting                                                                        |  🧑‍🎨   |  -  |
| Provided images and visualization inside documentation                                                  |  🧑‍🎨   |  -  |
| Created tags for components                                                                             |  🧑‍🎨   |  -  |
| Special packages for special use-cases (e.g. gloves optimized)                                          |  🧑‍🎨   |  -  |
| Documentation of patterns (cooperation between multiple components)                                     |  🧑‍🎨   |  -  |
| All variants of a component are defined                                                                 |  🧑‍🎨   |  -  |
| Component fulfills least a11y level AA                                                                  |  🧑‍🎨   | 🧑‍💻  |
| Provide touchscreen support (tested in dev-tools)                                                       |   -   | 🧑‍💻  |
| Mobile breakpoint optimized                                                                             |   -   | 🧑‍💻  |
| Verified behavior for the WAWI                                                                          |   -   | 🧑‍💻  |
| Implemented all density specialties <br>_(e.g. cozy for glove usage or compact for very small screens)_ |   -   | 🧑‍💻  |
