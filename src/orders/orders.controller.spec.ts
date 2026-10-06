import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;

  const mockOrdersService = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockOrdersService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    jest.clearAllMocks();

  });

  describe('createOrder', () => {
    it('should create an order', async () => {
    
      const username = 'omar';

      const orderDto = {
        products: [
          '65f123456789abcdef123456',
          '65f123456789abcdef123457',
        ],
        address: {
          username: 'omar',
          building: '10',
          street: 'Albatrway',
          city: 'Cairo',
          primary: false,
        },
      };

      const createdOrder = {
        _id: '65f123456789abcdef123458',
        username: 'omar',
        totalAmount: 100,
        products: orderDto.products,
        address: orderDto.address,
      };

      mockOrdersService.createOrder.mockResolvedValue(createdOrder);

      const result = await controller.createOrder(
        username,
        orderDto as any,
      );

      expect(result).toEqual(createdOrder);

      expect(mockOrdersService.createOrder).toHaveBeenCalledWith(
        orderDto,
        username,
      );

      expect(mockOrdersService.createOrder).toHaveBeenCalledTimes(1);
    });
  });
});