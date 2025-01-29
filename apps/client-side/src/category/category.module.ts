import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'CATEGORY_GRPC_CLIENT_TOKEN',
                transport: Transport.GRPC,
                options: {
                  package: 'category',
                  protoPath: join(__dirname, '../protos/category.proto'),
                  url: 'localhost:50001'
                },
            }
        ]),
    ],
    controllers: [CategoryController]
})
export default class CategoryModule {}