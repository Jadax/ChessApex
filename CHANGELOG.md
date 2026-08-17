# ChessApex release notes

## v0.2.0 — Analysis Core

This release adds the ChessApex post-game learning loop: UCI/MultiPV engine contracts, heuristic fallback analysis, centipawn-loss reporting, opening recognition, mistake clustering, FSRS retrievability, tablebase integration boundaries, and the `/analysis` review lab.

The heuristic fallback is intentionally labeled in the UI. Precise accuracy, best lines, and brilliant-move claims require a configured Stockfish WASM worker.
