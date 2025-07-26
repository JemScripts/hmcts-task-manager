import * as tasks from "../controllers/task.controller.js";
import express from "express";

export default (app) => {
    let router = express.Router();

    router.post("/", tasks.create);

    router.get("/", tasks.findAll);

    router.get("/:id", tasks.findOne);

    router.put("/:id", tasks.update);

    router.patch("/:id/status", tasks.updateStatus);

    router.delete("/:id", tasks.deleteOne);

    router.delete("/", tasks.deleteAll);

    app.use('/api/tasks', router);
}