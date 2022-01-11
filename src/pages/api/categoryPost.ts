import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma.category.findMany({
      where: {
        authorId: req.body,
      },
    });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
}
