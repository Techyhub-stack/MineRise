import express from "express";
import { status } from "minecraft-server-util";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const server = await status("node3.celestialnodes.xyz", 25570, {
      timeout: 3000,
    });

    res.json({
      onlinePlayers: server.players.online,
      maxPlayers: server.players.max,
    });
  } catch (err) {
    res.status(500).json({
      onlinePlayers: 0,
      maxPlayers: 0,
    });
  }
});

export default router;
