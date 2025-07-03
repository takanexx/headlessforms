'use client';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Answer } from '@prisma/client';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

export default function HomeChart({ answers }: { answers: Answer[] }) {
  type ChartData = { date: string; answers: number };
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    // 今月の1日と末日を取得
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const lastDay = new Date(year, month + 1, 0);

    // 今月の日付配列を生成
    const daysInMonth = lastDay.getDate();
    const days = [...Array(daysInMonth)].map((_, i) => {
      const d = new Date(year, month, i + 1);
      return d.toISOString().slice(0, 10);
    });

    // answersを日付ごとにカウント
    const counts = answers.reduce((acc: Record<string, number>, answer) => {
      const dateObj =
        typeof answer.createdAt === 'string'
          ? new Date(answer.createdAt)
          : answer.createdAt;
      const date = dateObj.toISOString().slice(0, 10);
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    // チャート用データ生成
    const chartData = days.map(date => ({
      date,
      answers: counts[date] || 0,
    }));

    setChartData(chartData);
  }, [answers]);

  const chartConfig = {
    answers: {
      label: 'Answers',
      color: '#2563eb',
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          // X軸ラベルを「M/D」形式で表示
          tickFormatter={value => {
            const d = new Date(value);
            return `${d.getMonth() + 1}/${d.getDate()}`;
          }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="answers" fill="var(--color-answers)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
