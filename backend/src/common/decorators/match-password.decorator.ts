import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'Match',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const [relatedProperty] = args.constraints;
          return (
            value === (args.object as Record<string, unknown>)[relatedProperty]
          );
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must match ${args.constraints[0]}`;
        },
      },
    });
  };
}
