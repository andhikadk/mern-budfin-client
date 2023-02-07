import {
  CashIcon,
  ShoppingCartIcon,
  ScaleIcon,
} from '@heroicons/react/outline';

const Card = ({ balance, date, income, expense }: any) => {
  const IDRupiah = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  const cards = [
    {
      name: 'Account balance',
      icon: ScaleIcon,
      amount: IDRupiah.format(balance),
    },
    {
      name: 'Incomes',
      icon: CashIcon,
      amount: IDRupiah.format(income),
    },
    {
      name: 'Expenses',
      icon: ShoppingCartIcon,
      amount: IDRupiah.format(expense),
    },
  ];

  return (
    <div>
      <div className='max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8'>
        <div className='flex justify-between'>
          <h2 className='text-lg pl-1 leading-6 font-medium text-gray-900'>
            Overview
          </h2>
          <small className='pr-2 text-gray-500'>{date}</small>
        </div>
        <div className='mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {/* Card */}
          {cards.map((card) => (
            <div
              key={card.name}
              className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='p-5'>
                <div className='flex items-center'>
                  <div className='flex-shrink-0'>
                    <card.icon
                      className='h-6 w-6 text-gray-400'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='ml-5 w-0 flex-1'>
                    <dl>
                      <dt className='text-sm font-medium text-gray-500 truncate'>
                        {card.name}
                      </dt>
                      <dd>
                        <div className='text-lg font-medium text-gray-900'>
                          {card.amount}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
