import db from "../models/index.js";

const Op = db.Sequelize.Op;
const Task = db.task;

const validStatuses = ["pending", "in_progress", "completed"];

export const create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }

    const task = {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate || null,
        status: req.body.status || "pending"
    };

    if (req.body.dueDate && isNaN(Date.parse(req.body.dueDate))) {
        return res.status(400).send({
            message: "Invalid due date format. Please use a valid ISO date string."
        });
    }

    if (req.body.status && !validStatuses.includes(req.body.status)) {
        return res.status(400).send({
            message: "Invalid status. Must be: pending, in_progress or completed."
        });
    }

    Task.create(task)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "An error occured while creating the task."
        });
    });
};

export const findAll = (req, res) => {
    const title = req.query.title;
    const condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    Task.findAll({where: condition})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "An error occurred while retrieving tasks."
        });
    });
};

export const findOne = (req, res) => {
    const id = req.params.id;

    Task.findByPk(id)
        .then(data => {
            if(data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find task with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving task with id=" + id
            });
        });
};

export const update = (req, res) => {
    const id = req.params.id;

    if (req.body.dueDate && isNaN(Date.parse(req.body.dueDate))) {
        return res.status(400).send({
            message: "Invalid due date format. Please use a valid ISO date string."
        });
    }

    if (req.body.status && !validStatuses.includes(req.body.status)) {
        return res.status(400).send({
            message: "Invalid status. Must be: pending, in_progress or completed."
        });
    }

    Task.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            if(num === 1) {
                res.send({
                    message: "Task was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update task with id=${id}. Task was not found or req.body was empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating task with id=" + id
            });
        });
};

export const deleteOne = (req, res) => {
    const id = req.params.id;

    Task.destroy({
        where: {id: id}
    })
        .then(num => {
            if(num === 1) {
                res.send({
                    message: "Task was successfully deleted!"
                });
            } else {
                res.send({
                    message: `Cannot delete task with id=${id}. Task not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete task with id=" + id
            });
        });
};

export const deleteAll = (req, res) => {
    Task.destroy({
        where:{},
        truncate: false
    })
        .then(nums => {
            res.send({message: `${nums} tasks were deleted successfully!`});
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tasks."
            });
        });
};

export const updateStatus = (req, res) => {
    const id = req.params.id;
    const newStatus = req.body.status;

    if (!validStatuses.includes(newStatus)) {
        return res.status(400).send({ message: "Invalid status." });
    }

    Task.update({ status: newStatus }, { where: { id } })
        .then(([num]) => {
            if (num === 1) {
                res.send({ message: "Status successfully updated. "});
        } else {
            res.status(404).send({ message: `Task with id=${id} not found.` });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving tasks"
        });
    });
};