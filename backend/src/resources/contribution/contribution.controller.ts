import { Request, Response } from "express";
import { CreateContributionDto } from "./contribution.types";
import { createContribution, listContributions, readContribution } from "./contribution.service";
import { ReasonPhrases, StatusCodes } from "http-status-codes";

const index = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Lista as contribuições'
    #swagger.parameters['ampaign'] = {
      in: 'query',
      description: 'ID da campanha para filtrar as contribuições',
      required: false,
      type: 'string'
    }
    #swagger.parameters['skip'] = {
      in: 'query',
      description: 'Número de contribuições a pular (para paginação)',
      required: false,
      type: 'integer'
    }
    #swagger.parameters['take'] = {
      in: 'query',
      description: 'Número de contribuições a retornar',
      required: false,
      type: 'integer'
    }
    #swagger.responses[200] = {
      description: 'Lista de contribuições',
      schema: { type: 'array', items: { $ref: '#/definitions/Contribution' } }
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor'
    }
  */
  try {
    const campaignId = req.query.campaign ? req.query.campaign.toString() : "";
    const skip = req.query.skip ? parseInt(req.query.skip.toString()) : undefined;
    const take = req.query.take ? parseInt(req.query.take.toString()) : undefined;
    const uid = req.session.uid ? req.session.uid : "";
    const contributions = await listContributions(campaignId, uid, skip, take);
    res.status(StatusCodes.OK).json(contributions);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const create = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Cria uma nova contribuição'
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Dados da nova contribuição',
      required: true,
      schema: { $ref: '#/definitions/CreateContributionDto' }
    }
    #swagger.responses[200] = {
      description: 'Contribuição criada com sucesso',
      schema: { $ref: '#/definitions/Contribution' }
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor'
    }
  */
  const contribution = req.body as CreateContributionDto;
  try {
    const uid = req.session.uid!;
    const newContribution = await createContribution(contribution, uid);
    res.status(StatusCodes.OK).json(newContribution);
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const read = async (req: Request, res: Response) => {
  /*
    #swagger.summary = 'Obtém uma contribuição específica'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID da contribuição',
      required: true,
      type: 'string'
    }
    #swagger.responses[200] = {
      description: 'Dados da contribuição',
      schema: { $ref: '#/definitions/Contribution' }
    }
    #swagger.responses[404] = {
      description: 'Contribuição não encontrada'
    }
    #swagger.responses[500] = {
      description: 'Erro interno do servidor'
    }
  */
  try {
    const { id } = req.params;
    const uid = req.session.uid!;
    const contribution = await readContribution(id, uid);
    if (!contribution) return res.status(StatusCodes.NOT_FOUND).json(ReasonPhrases.NOT_FOUND);
    res.status(StatusCodes.OK).json(contribution);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

export default { index, create, read };