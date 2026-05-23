# PaperPal Assistant

PaperPal is a starter prototype for a friendly AI assistant that sits on a sheet of paper, animates on the desktop, and answers user questions.

The current prototype is a dependency-free web version in `index.html`. It demonstrates:

- A paperclip-style assistant character inspired by the provided reference image, including the yellow paper it sits on.
- Idle, listening, thinking, and celebration animation states.
- A chat panel for asking questions.
- Product notes for how the same assistant should work on Windows and iOS.

## Run The Prototype

Open `index.html` in a browser.

For a local server:

```bash
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Product Direction

### Windows

Windows can support the intended desktop companion experience:

- Transparent, frameless, always-on-top window.
- Draggable assistant that can sit on the desktop.
- Native tray icon for settings, quit, and voice toggle.
- Speech input/output through Windows APIs.
- AI answers streamed from a backend proxy.

Recommended implementation path:

- Tauri or Electron for the desktop shell.
- The current HTML/CSS/JS prototype can become the renderer UI.
- A small backend service should hold AI credentials and stream responses to the app.

### iOS

iOS does not allow third-party apps to place a free-floating character above all other apps. The assistant can still be useful through supported surfaces:

- Main iOS app with the animated assistant.
- Home Screen and Lock Screen widgets.
- Live Activity for ongoing assistant sessions.
- Siri Shortcuts and App Intents.
- Push notifications for follow-ups.

Recommended implementation path:

- SwiftUI app for iPhone and iPad.
- Recreate the PaperPal character as a vector/animation asset.
- Use App Intents for voice-triggered actions.
- Use a backend proxy for AI answers.

## AI Backend Shape

Client apps should not ship API keys. Use this flow:

1. User asks a question.
2. App sends the prompt to your backend over HTTPS.
3. Backend calls the AI provider with a system prompt and user context.
4. Backend streams the answer back to the app.
5. App animates PaperPal based on state: listen, think, speak, idle.

Suggested endpoints:

- `POST /api/chat` for text chat.
- `POST /api/voice/transcribe` for speech-to-text.
- `POST /api/voice/speak` for text-to-speech.
- `GET /api/profile` for assistant personality and user preferences.

## Next Build Steps

1. Package the prototype in Tauri or Electron for Windows.
2. Add a secure backend proxy for AI responses.
3. Add microphone input and text-to-speech.
4. Create a SwiftUI version for iOS.
5. Add persistent memory with user-controlled privacy settings.
