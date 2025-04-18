![Vayyar Logo](public/images/vayyar-logo-text.png)
![Clinical Hero Image](public/images/clinical/clinical-hero.jpg)


## Project Purpose

This website serves as the primary online presence for Vayyar's **VayyarCare** service (see [vayyar.com](https://vayyar.com) for more information about Vayyar). It aims to inform potential users and stakeholders about the capabilities and benefits of the VayyarCare system.

Key sections of the website include:

-   **Homepage:** Introduces the VayyarCare story and value proposition.
-   **Clinical:** Details how VayyarCare enhances patient safety, streamlines nursing workflows, and empowers staff to deliver superior care with reduced stress.
-   **Executive:** Highlights the benefits for long-term care facility management, focusing on operational efficiency gains, significant cost savings, and elevated standards of care driven by advanced AI technology.
-   **Mission:** Presents Vayyar's vision statement regarding the VayyarCare service.
-   **About Us:** Contains general information about Vayyar.
-   **Customers:** Showcases customer success stories or testimonials (inferred).

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (v15.3.0) with App Router
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **UI Library:** [React](https://reactjs.org/) (v19)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
-   **Animation:** [GSAP](https://greensock.com/gsap/)
-   **Backend/Data Storage (for assets):** [Firebase](https://firebase.google.com/) (specifically Firebase Storage for video uploads)
-   **Package Manager:** [pnpm](https://pnpm.io/)
-   **Linting:** [ESLint](https://eslint.org/)

## Getting Started

### Prerequisites

-   Node.js (version compatible with Next.js 15, check Next.js docs)
-   pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd vayyar-care-mockup
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
    _(Note: If you encounter issues, try the `pnpm run reinstall` script after pruning the pnpm store if necessary)._

### Running the Development Server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
pnpm run build
```

### Starting the Production Server

```bash
pnpm run start
```

## Available Scripts

In addition to the standard Next.js scripts (`dev`, `build`, `start`, `lint`), the following custom scripts are available:

-   `pnpm run reinstall`: Cleans the `node_modules` directory and pnpm store, then reinstalls dependencies. Useful for resolving dependency issues.
-   `pnpm run upload-videos`: Executes the `tools/upload_videos_to_firebase.js` script to upload video assets to Firebase Storage. Configuration for Firebase credentials might be required.

### Helper Scripts (`tools/`)

These scripts are located in the `tools/` directory and are used for asset preparation, likely before running `upload-videos`:

-   `convert_mov_to_mp4.sh`: Converts `.mov` video files to `.mp4` format using `ffmpeg`.
-   `make_scrubbable.sh`: Processes video files (likely MP4) to ensure they are easily scrubbable in web video players, possibly by adjusting keyframes or using `ffmpeg`.

Make sure you have `ffmpeg` installed and configured in your environment if you need to use these shell scripts.

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit bug reports, feature requests, and pull requests, including our issue title and commit message conventions.
