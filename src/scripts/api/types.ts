namespace types {
    export class IPBan {
        "ipMask":string;
        "expiration":Date;
        "comment":string;
        "id":number;
    }

    export class Table {
        "filename":string;
        "crc32":number;
        "description":string;
        "id":number;
    }

    export class User {
        "name":string;
        "lastLogin":Date;
        "id":number;
    }

    export class Server {
        "name":string;
        "numPlayers":number;
        "maxPlayers":number;
        "id":number;
    }

    export class Error {
        "err":string;
    }

    export class ExtendedUser {
        "name":string;
        "lastLogin":Date;
        "id":number;
        "roles":Array<string>;
    }

    export class RegisteredUser {
        "name":string;
        "id":number;
    }

    export class OnlineUser {
        "name":string;
    }

    export class InputError {
        "status":string;
        "reason":string;
        "errors":Array<string>;
    }

    export class Mission {
        "filename":string;
        "crc32":number;
        "missionType":string;
        "maxPlayers":number;
        "description":string;
        "id":number;
    }

    export class APIToken {
        "token":string;
    }

    export class UserLogin {
        "name":string;
        "password":string;
    }

    export class ExtendedServer {
        "name":string;
        "numPlayers":number;
        "maxPlayers":number;
        "id":number;
        "ip":string;
        "port":number;
    }
}