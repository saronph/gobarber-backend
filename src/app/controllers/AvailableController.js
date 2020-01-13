import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    // faz com que a data esteja em um número inteiro
    const searchDate = Number(date);

    // filtra as consultas
    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.params.providerId, // todos do providerId do routes
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    // todos os horários disponíveis do provider
    const schedule = [
      '08:00', // 2018-06-23 08:00:00
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ];

    // objeto que retorna as datas disponíveis para o user
    const available = schedule.map(time => {
      const [hour, minute] = time.split(':'); // divide a hora, oq vir antes de ':' é hora e depois é minutos

      // formata o formato da hora
      const value = setSeconds(
        setMinutes(setHours(searchDate, hour), minute),
        0
      );

      return {
        time,
        value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"), // formato definido anteriormente
        /*
        verifica se hora do agend. é após a hora atual, e ver se o
        horario está disponivel, 'a' cada um dos 'appoint...' formatando em
        hrs e mins.
        */
        available:
          isAfter(value, new Date()) &&
          !appointments.find(a => format(a.date, 'HH:mm') === time),
      };
    });

    return res.json(available);
  }
}

export default new AvailableController();
