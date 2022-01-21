import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'PUT':
      try {
        const data = await prisma.category.update({
          where: {
            id: Number(req.body.id),
          },
          data: {
            items: req.body.items,
          },
        });

        res.status(200).send(data);
      } catch (error) {
        console.log(error);
      }
      break;

    default:
      break;
  }
}
