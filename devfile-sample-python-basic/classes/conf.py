import os, sys
from configparser import ConfigParser

def configDB(filename='classes/conf/config.ini', section='postgresql'):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)
    #print('FILE DI CONFIGURAZIONE: ' + filename + ' IL FILE ESISTE? ' + str(os.path.isfile(filename)))
    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        #print('Leggo la sezione {0}')
        for param in params:
            db[param[0]] = param[1]
            #print('Parametro DB: ' + db[param[0]] + ' VALORE ' + param[1])
    else:
        raise Exception('La sezione richiesta {0} non si trova nel {1} file'.format(section, filename))

    return db
    
def configQueries(filename='classes/conf/config.ini', section='queries'):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)
    # print('FILE DI CONFIGURAZIONE: ' + filename + ' IL FILE ESISTE? ' + str(os.path.isfile(filename)))
    # get section, default to postgresql
    sqls = {}
    if parser.has_section(section):
        params = parser.items(section)
        # print('Leggo la sezione {0}')
        for param in params:
            sqls[param[0]] = param[1]
            #print('QUERY: ' + sqls[param[0]] + ' STATEMENT ' + param[1])
    else:
        raise Exception('La sezione richiesta {0} non si trova nel {1} file'.format(section, filename))

    return sqls
