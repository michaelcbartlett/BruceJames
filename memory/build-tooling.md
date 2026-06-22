---
name: build-tooling
description: How to build/typecheck the BruceJames Angular site; Node is not on PATH in the agent shell
metadata:
  type: project
---

BruceJames is an Angular 19 app; build/typecheck is `ng build` (npm scripts: start/build/watch/test).

Node and npm are NOT on PATH in the agent's Bash/PowerShell shell, and no node.exe exists under the user profile or common version-manager locations. The Launch preview panel runs in a separate managed environment, so verification of TS/template changes has to happen there (or ask the user to run `ng build`), not via a local build in-session. Don't waste time searching for node.
