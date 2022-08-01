import model from "./model.js";
import { InternalServerError, NotFoundError } from "../../lib/error.js";

const GET = async (req, res, next) => {
    const conferences = await model.GET(req.query,req.params);

    if (conferences.length == 0) return next(new NotFoundError(404, "client error"));

    res.status(200).json({
      status: 200,
      message: "ok",
      data: conferences,
    });
};

const POST = async (req, res, next) => {
    const conference = await model.POST(req.body, req.files);
    if (!conference) return next(new NotFoundError(404, "client error"));

    res.status(200).json({
      status: 200,
      message: "ok",
      data: conference,
    });
  
};

const PUTSTATUS = async (req, res, next) => {
    const conference = await model.PUTSTATUS(req.params, req.body);
    if (!conference) return next(new NotFoundError(404, "client error"));

    res.status(202).json({
      status: 202,
      message: "status edited",
      data: conference,
    });
};

export default { GET, POST, PUTSTATUS };
