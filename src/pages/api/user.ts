// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: req.body,
      },
    });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
  }
}
